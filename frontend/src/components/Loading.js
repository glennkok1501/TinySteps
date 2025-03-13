const Loading = ({isLoading, setIsLoading}) => {
    return ( 
        <>
        {isLoading && <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>}
        </>
        
     );
}
 
export default Loading;