import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import type { ScheduleClass } from '../../data/scheduleData.js';
import { database } from '../../database/connection.js';

interface ScheduleRow extends RowDataPacket, ScheduleClass {}

interface CountRow extends RowDataPacket {
  total: number;
}

export async function findAll(): Promise<ScheduleClass[]> {
  const [rows] = await database.query<ScheduleRow[]>(
    `SELECT id, subject, professor, classroom, time, dayOfWeek
     FROM schedule
     ORDER BY id`
  );

  return rows;
}

export async function findPaginated(
  page: number,
  limit: number,
  search: string
): Promise<{ data: ScheduleClass[]; total: number }> {
  const normalizedSearch = search.trim();
  const searchPattern = `%${normalizedSearch}%`;
  const offset = (page - 1) * limit;

  const [countRows] = await database.execute<CountRow[]>(
    `SELECT COUNT(*) AS total
     FROM schedule
     WHERE (? = '' OR subject LIKE ? OR professor LIKE ?)`,
    [normalizedSearch, searchPattern, searchPattern]
  );

  const [rows] = await database.execute<ScheduleRow[]>(
    `SELECT id, subject, professor, classroom, time, dayOfWeek
     FROM schedule
     WHERE (? = '' OR subject LIKE ? OR professor LIKE ?)
     ORDER BY id
     LIMIT ? OFFSET ?`,
    [normalizedSearch, searchPattern, searchPattern, limit, offset]
  );

  return {
    data: rows,
    total: Number(countRows[0]?.total ?? 0)
  };
}

export async function findById(
  id: string
): Promise<ScheduleClass | undefined> {
  const [rows] = await database.execute<ScheduleRow[]>(
    `SELECT id, subject, professor, classroom, time, dayOfWeek
     FROM schedule
     WHERE id = ?`,
    [id]
  );

  return rows[0];
}

export async function create(
  item: ScheduleClass
): Promise<ScheduleClass> {
  await database.execute<ResultSetHeader>(
    `INSERT INTO schedule
      (id, subject, professor, classroom, time, dayOfWeek)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      item.id,
      item.subject,
      item.professor,
      item.classroom,
      item.time,
      item.dayOfWeek
    ]
  );

  return item;
}

export async function update(
  id: string,
  item: ScheduleClass
): Promise<ScheduleClass | undefined> {
  await database.execute<ResultSetHeader>(
    `UPDATE schedule
     SET subject = ?, professor = ?, classroom = ?, time = ?, dayOfWeek = ?
     WHERE id = ?`,
    [
      item.subject,
      item.professor,
      item.classroom,
      item.time,
      item.dayOfWeek,
      id
    ]
  );

  return findById(id);
}

export async function remove(id: string): Promise<boolean> {
  const [result] = await database.execute<ResultSetHeader>(
    'DELETE FROM schedule WHERE id = ?',
    [id]
  );

  return result.affectedRows > 0;
}