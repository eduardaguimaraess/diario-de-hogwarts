import { useEffect, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import {
    AlertTriangle,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Clock,
    Loader2,
    MapPin,
    Search,
    User
} from 'lucide-react';
import { getPaginatedSchedule } from '../services/api';
import type { PaginatedScheduleResponse } from '../services/api';

const PAGE_SIZE = 5;

export function SchedulePaginated() {
    const [searchInput, setSearchInput] = useState('');
    const [submittedSearch, setSubmittedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [retryCount, setRetryCount] = useState(0);
    const [result, setResult] = useState<PaginatedScheduleResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadSchedule() {
            try {
                setLoading(true);
                setError(null);

                const response = await getPaginatedSchedule(
                    page,
                    PAGE_SIZE,
                    submittedSearch
                );

                if (!cancelled) {
                    setResult(response);
                }
            } catch (err) {
                if (!cancelled) {
                    setError((err as Error).message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadSchedule();

        return () => {
            cancelled = true;
        };
    }, [page, submittedSearch, retryCount]);

    function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setPage(1);
        setSubmittedSearch(searchInput.trim());
    }

    const totalPages = result?.totalPages ?? 0;

    return (
        <main style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
            <header style={{ marginBottom: '1.5rem' }}>
                <h1
                    style={{
                        color: '#fff',
                        fontSize: '1.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        margin: 0
                    }}
                >
                    <BookOpen color="var(--color-lavender)" size={24} />
                    Buscar aulas
                </h1>

                <p
                    style={{
                        color: 'var(--color-lavender)',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem'
                    }}
                >
                    Pesquise por disciplina ou professor e navegue pelos resultados.
                </p>
            </header>

            <form
                onSubmit={handleSearch}
                style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                    maxWidth: '600px'
                }}
            >
                <label
                    htmlFor="schedule-search"
                    style={{ position: 'absolute', left: '-9999px' }}
                >
                    Buscar por disciplina ou professor
                </label>

                <input
                    id="schedule-search"
                    type="search"
                    maxLength={100}
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Ex.: Poções ou Snape"
                    style={{
                        flex: 1,
                        minWidth: 0,
                        padding: '0.7rem 0.9rem',
                        backgroundColor: '#0b162c',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.9rem'
                    }}
                />

                <button
                    type="submit"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.7rem 1rem',
                        backgroundColor: 'var(--color-blue)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    <Search size={16} />
                    Buscar
                </button>
            </form>

            {result && !loading && !error && (
                <p style={{ color: 'var(--color-lavender)', marginBottom: '1rem' }}>
                    {result.total}{' '}
                    {result.total === 1 ? 'aula encontrada' : 'aulas encontradas'}
                    {submittedSearch ? ` para "${submittedSearch}"` : ''}.
                </p>
            )}

            {loading && (
                <div
                    role="status"
                    style={{
                        padding: '3rem',
                        textAlign: 'center',
                        color: 'var(--color-lavender)'
                    }}
                >
                    <Loader2
                        className="animate-spin"
                        size={32}
                        style={{ marginBottom: '0.75rem' }}
                    />
                    <p>Carregando aulas...</p>
                </div>
            )}

            {!loading && error && (
                <div
                    role="alert"
                    style={{
                        padding: '2rem',
                        textAlign: 'center',
                        color: '#ff6b6b',
                        backgroundColor: '#0b162c',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px'
                    }}
                >
                    <AlertTriangle size={30} />
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() => setRetryCount((count) => count + 1)}
                        style={{
                            padding: '0.55rem 1rem',
                            backgroundColor: 'var(--color-navy)',
                            color: '#fff',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Tentar novamente
                    </button>
                </div>
            )}

            {!loading && !error && result && result.data.length === 0 && (
                <div
                    style={{
                        padding: '3rem',
                        textAlign: 'center',
                        color: 'var(--color-lavender)',
                        backgroundColor: '#0b162c',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px'
                    }}
                >
                    <BookOpen size={30} />
                    <p>Nenhuma aula encontrada. Tente outro termo de busca.</p>
                </div>
            )}

            {!loading && !error && result && result.data.length > 0 && (
                <>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '1rem'
                        }}
                    >
                        {result.data.map((item) => (
                            <article
                                key={item.id}
                                style={{
                                    backgroundColor: '#0b162c',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '12px',
                                    padding: '1.25rem'
                                }}
                            >
                                <span
                                    style={{
                                        display: 'inline-block',
                                        backgroundColor: 'rgba(150, 129, 217, 0.15)',
                                        color: 'var(--color-lavender)',
                                        border: '1px solid var(--border-color)',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}
                                >
                                    {item.dayOfWeek}
                                </span>

                                <h2
                                    style={{
                                        color: '#fff',
                                        fontSize: '1.1rem',
                                        margin: '0.8rem 0'
                                    }}
                                >
                                    {item.subject}
                                </h2>

                                <div
                                    style={{
                                        display: 'grid',
                                        gap: '0.5rem',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <div style={detailRowStyle}>
                                        <User size={15} color="var(--color-lavender)" />
                                        <span>{item.professor}</span>
                                    </div>

                                    <div style={detailRowStyle}>
                                        <MapPin size={15} color="var(--color-lavender)" />
                                        <span>{item.classroom}</span>
                                    </div>

                                    <div style={detailRowStyle}>
                                        <Clock size={15} color="var(--color-lavender)" />
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <nav
                        aria-label="Navegação das páginas de aulas"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                            marginTop: '1.75rem'
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                            disabled={page <= 1}
                            style={paginationButtonStyle(page <= 1)}
                        >
                            <ChevronLeft size={16} />
                            Anterior
                        </button>

                        <span style={{ color: 'var(--color-lavender)' }}>
                            Página {page} de {totalPages}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setPage((currentPage) => Math.min(totalPages, currentPage + 1))
                            }
                            disabled={page >= totalPages}
                            style={paginationButtonStyle(page >= totalPages)}
                        >
                            Próxima
                            <ChevronRight size={16} />
                        </button>
                    </nav>
                </>
            )}
        </main>
    );
}

const detailRowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
};

function paginationButtonStyle(disabled: boolean): CSSProperties {
    return {
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.55rem 0.8rem',
        backgroundColor: '#0b162c',
        color: disabled ? 'var(--text-secondary)' : '#fff',
        border: '1px solid var(--border-color)',
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1
    };
}