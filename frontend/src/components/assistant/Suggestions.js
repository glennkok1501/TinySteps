import SuggestionBubble from "./SuggestionBubble";

const Suggestions = ({handleSubmit}) => {

    const sugs = [
        "What are some preschools in the North",
        "How should I decide what preschool to pick",
        "What are the fees and subsidies provided"
    ]

    return ( 
        <div className="d-flex justify-content-end m-2">
            <p className="text-muted">Suggestions:</p>
            {
                sugs.map((s) => (
                    <div className="ms-2 me-2" onClick={() => handleSubmit(s)}>
                        <SuggestionBubble text={s} />

                    </div>
                ))
            }
        </div>
     );
}
 
export default Suggestions;