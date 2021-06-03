const Total = ({dataset}) => {
    var total =0;
    dataset.map((data) => {
        total += data.price * data.number
    });
    return (  
        <tr>
            <td class="empty"></td>
            <td class="empty"></td>
            <td class="empty"></td>
            <td class="empty"></td>
            <td>{total}</td>
        </tr>
    );
}
 
export default Total;