import "./Table.css"
const Table = ({ data }) => {
    console.log(data)
    return (
        <table>
            <thead>
                <tr>
                    {Object.keys(data[0]).map(header => <td>{header}</td>)}
                </tr>
            </thead>
            {data.map(obj => {
                return <tr>{Object.values(obj).map(val => <td>{val}</td>)}</tr>
            })}
        </table>
    )
}

export default Table