import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import FilterRadioBtn from './FilterRadioBtn';
import { useState } from 'react';
import axios from 'axios';

const FilterBtn = ({showFilter, setShowFilter, setFiltered, data}) => {

    const [filters, setFilters] = useState([
        {title: "Food offered", key: "food_offered", selected: ''},
        {title: "Second Language", key: "second_languages_offered", selected: ''},
        {title: "Spark Certified", key: "spark_certified", selected: ''},
        {title: "Transport Provided", key: "provision_of_transport", selected: ''},
    ])

    // useEffect(() => {
    //     console.log(filters)
    // }, [filters])

    const handleClose = () => {
        setShowFilter(false)
        setFilters((state) => (
            state.map((item) => ({...item, selected: ''}))
        ))
    }

    const handleSubmit = () => {
        axios.get(`${process.env.REACT_APP_API}/schools/filter?food_offered=${filters[0].selected}&second_languages_offered=${filters[1].selected}&spark_certified=${filters[2].selected}&provision_of_transport=${filters[3].selected}`)
            .then((res) => {
                if (res.status === 200) {
                    setFiltered(res.data)
                    handleClose()
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleClear = () => {
        handleClose()
        setFiltered(data)
    }
    
    return ( 
        <>
            <Button onClick={() => setShowFilter(true)}>
                Filter
            </Button>
            <Modal
             onHide={handleClose}
                show={showFilter}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filter by Preference</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        filters.map((f) => (
                            <div className='mb-4' key={f.key}>
                                <FilterRadioBtn setFilters={setFilters} title={f.title} option={f.key} />
                            </div>
                        ))
                    }

                </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClear}>
                Clear
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
            </Modal>
        </>
        
     );
}
 
export default FilterBtn;