const DataView = ({ data, deleteData }) => {
    if (data) {
        return (
            <div>
                <h2>Data from Database</h2>
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            {item.data}
                            <button onClick={() => deleteData(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default DataView;