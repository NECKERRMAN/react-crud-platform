import "./Table.css";

const Table = ({ children, header }) => {
    return (
        <table className="table">
            {header}
            <tbody>{children}</tbody>
        </table>
    );
};

export default Table;
