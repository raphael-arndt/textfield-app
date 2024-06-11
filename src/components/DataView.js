import React from 'react';

const DataView = ({data}) => {
    if (data) {
        return (
            <div>
                <h2>Data from Database</h2>
                <ul>
                    {data.map((item) => {
                            return (
                                <li
                                >
                                    <ul className="inner">
                                        {Object.entries(item.data).map(([key, val]) => {
                                            if (key === 'auftragskopf' || key === 'patientendaten') {
                                                return (<pre>
                                                {JSON.stringify(val, null, 2)}
                                            </pre>)
                                            }
                                        })}
                                    </ul>
                                </li>)
                        }
                    )}
                </ul>
            </div>
        );
    }
};

export default DataView;