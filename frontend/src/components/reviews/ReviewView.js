const ReviewView = ({data}) => {
    return ( 
        <div>
            <p>{data.rating}</p>
            <p>{data.comment}</p>

        </div>
     );
}
 
export default ReviewView;