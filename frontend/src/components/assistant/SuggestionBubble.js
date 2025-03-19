const SuggestionBubble = ({text}) => {
    return ( 
        <div style={{width: 200, borderRadius: 50}} className="btn card bg-dark text-white">
            {text}
        </div>
     );
}
 
export default SuggestionBubble;