
console.log(Object.entries)

const DataView = ({ data, deleteData }) => {
    if (data) {
        return (
            <div>
                <h2>Data from Database</h2>
                <ul>
                    {data.map((item) => (
                        <li
                        >
                            <ul className="inner">
                                {Object.entries(item).map(([key]) => (

                                    <pre>{JSON.stringify(item, null, 2)}</pre>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default DataView;