export default function DataHeadColumn({ column, sort, onSort }) {
    const className = `${!column.field || !sort || sort.field !== column.field ? '' : sort.desc ? 'sort-desc' : 'sort-asc'}${column.type === 'number' ? ' data-field-number' : ''}`;

    function handleClick() {
        if (!column.field) return;
        onSort && onSort(column.field);
    }

    return (
        <th className={className} onClick={handleClick}>{column.label || column.field}</th>
    );
}