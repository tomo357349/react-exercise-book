import { useState } from 'react';
import DataBody from './DataBody.jsx';
import DataColumn from './DataColumn.jsx';
import DataHead from './DataHead.jsx';
import DataHeadColumn from './DataHeadColumn.jsx';
import DataHeadRow from './DataHeadRow.jsx';
import DataRow from './DataRow.jsx';
import Intersection from './Intersection.jsx';

export default function DataTable({ data, columns }) {
    const keyColumn = columns.find(c => c.isKey);
    const [count, setCount] = useState(20);
    const [sort, setSort] = useState({
        field: '',
        desc: false,
    });

    if (!data) {
        return (
            <div className="data-table-message">該当データがありません。</div>
        );
    }

    const viewData = data.slice().sort((a, b) => {
        const f = sort.field;
        if (!f) return data.indexOf(a) - data.indexOf(b);
        let num = 0;
        if (a[f] < b[f]) {
            num = -1;
        } else if (a[f] > b[f]) {
            num = 1;
        } else {
            num = data.indexOf(a) - data.indexOf(b);
        }
        return (sort.desc ? -1 : 1) * num;
    }).slice(0, count);

    function handleSort(field) {
        setSort(sort => {
            if (sort.field === field) return { ...sort, desc: !sort.desc };
            else return { field, desc: false };
        });
    }

    function handleAppear() {
        setCount(count => count + 20);
    }

    return (
        <>
            <div className="data-table-message">{data.length}件のデータが見つかりました。</div>
            <table className="data-table">
                <caption>&nbsp;</caption>
                <DataHead>
                    <DataHeadRow>
                        {columns.map(c => (
                            <DataHeadColumn key={c.field} column={c} sort={sort} onSort={handleSort} />
                        ))}
                    </DataHeadRow>
                </DataHead>
                <DataBody>
                    {viewData.map((d, i) => (
                        <DataRow key={keyColumn ? d[keyColumn.field] : i}>
                            {columns.map(c => (
                                <DataColumn key={c.field} data={d} column={c} />
                            ))}
                        </DataRow>
                    ))}
                </DataBody>
            </table>
            {count < data.length && <Intersection onAppear={handleAppear}>
                続きを読み込み.. <span className="loader"></span>
            </Intersection>}
        </>
    );
}