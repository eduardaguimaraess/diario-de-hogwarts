import type { ScheduleClass } from '../../data/scheduleData.js';
import * as scheduleRepository from './scheduleRepository.js';

export interface ScheduleInput {
  subject: string;
  professor: string;
  classroom: string;
  time: string;
  dayOfWeek: string;
}

export interface PaginationInput {
  page: number;
  limit: number;
  search: string;
}

export async function listSchedule(): Promise<ScheduleClass[]> {
  return scheduleRepository.findAll();
}

export async function listSchedulePaginated(input: PaginationInput) {
  const result = await scheduleRepository.findPaginated(
    input.page,
    input.limit,
    input.search
  );

  return {
    data: result.data,
    total: result.total,
    page: input.page,
    limit: input.limit,
    totalPages: Math.ceil(result.total / input.limit)
  };
}

export async function getScheduleById(
  id: string
): Promise<ScheduleClass | undefined> {
  return scheduleRepository.findById(id);
}

export async function createSchedule(
  input: ScheduleInput
): Promise<ScheduleClass> {
  const newClass: ScheduleClass = {
    id: Date.now().toString(),
    ...input
  };

  return scheduleRepository.create(newClass);
}

export async function updateSchedule(
  id: string,
  input: Partial<ScheduleInput>
): Promise<ScheduleClass | undefined> {
  const currentClass = await scheduleRepository.findById(id);

  if (!currentClass) {
    return undefined;
  }

  const updatedClass: ScheduleClass = {
    ...currentClass,
    ...input,
    id
  };

  return scheduleRepository.update(id, updatedClass);
}

export async function deleteSchedule(id: string): Promise<boolean> {
  return scheduleRepository.remove(id);
}