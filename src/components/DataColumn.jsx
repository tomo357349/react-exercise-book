export default function DataColumn({ data, column }) {
    const className = `${column.type === 'number' ? 'data-field-number' : ''}`;
    return (
        <td className={className}>{column.component ? column.component(data) : data[column.field]}</td>
    );
}