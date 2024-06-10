const DataView = ({ data, deleteData }) => {
    if (data) {
        return (
            <div>
                <h2>Data from Database</h2>
                <ul>
                    {data.map((item) => (
                        <li key={item.id}
                        >
                            <ul className="inner">
                                {Object.entries(item.data).map(([key]) => (
                                    !Array.isArray(item.data[key]) ?
                                        <p>{key}: {item.data[key]}</p> :
                                        <p>{key}: {JSON.stringify(item.data[key])}</p>
                                ))}
                            </ul>
                            <button onClick={() => deleteData(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default DataView;