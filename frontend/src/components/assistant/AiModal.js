import { mdiCreation } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AiModal = ({ showModal, setShowModal, sendMessage }) => {
  const resetFields = () => {
    setNearHome(false);
    setAddr('');
    setBudgetConsideration(false);
    setBudget('');
    setDiet('None');
    setRemarks('');
    setLanguage('No Preference');
    setPreschoolType('No Preference');
    setOperatingHours('No Preference');
    setTransport(false);
    setSpecialNeeds(false);
  };

  const [nearHome, setNearHome] = useState(false);
  const [addr, setAddr] = useState('');
  const [budgetConsideration, setBudgetConsideration] = useState(false);
  const [budget, setBudget] = useState('');
  const [diet, setDiet] = useState('None');
  const [remarks, setRemarks] = useState('');
  const [language, setLanguage] = useState('No Preference');
  const [preschoolType, setPreschoolType] = useState('No Preference');
  const [operatingHours, setOperatingHours] = useState('No Preference');
  const [transport, setTransport] = useState(false);
  const [specialNeeds, setSpecialNeeds] = useState(false);

  const handleClose = () => {
    resetFields();
    setShowModal(false);
  };

  const handleSubmit = () => {
    const prompt = `Suggest a preschool in Singapore based on the following preferences:
    ${nearHome ? `Location near: ${addr}.` : ''}
    ${budgetConsideration ? `Budget: SGD ${budget}.` : ''}
    Dietary Restrictions: ${diet}.
    Preferred Language of Instruction: ${language}.
    Preschool Type: ${preschoolType}.
    Operating Hours: ${operatingHours}.
    ${transport ? 'Requires transport services.' : ''}
    ${specialNeeds ? 'Child has special needs.' : ''}
    Additional Remarks: ${remarks}`;
    
    sendMessage(prompt);
    handleClose();
  };

  return (
    <>
      <button className="btn btn-secondary me-2" onClick={() => setShowModal(true)}>
        <Icon path={mdiCreation} size={1} />
      </button>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Get Recommendations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Preschool Near Home Toggle */}
            <Form.Group>
              <Form.Label>Do you want the preschool near your home?</Form.Label>
              <div>
                <Form.Check inline label="Yes" type="radio" checked={nearHome} onChange={() => setNearHome(true)} />
                <Form.Check inline label="No" type="radio" checked={!nearHome} onChange={() => setNearHome(false)} />
              </div>
            </Form.Group>

            {nearHome && (
              <Form.Group className="mt-2">
                <Form.Label>Enter your address</Form.Label>
                <Form.Control type="text" value={addr} onChange={(e) => setAddr(e.target.value)} />
              </Form.Group>
            )}

            {/* Budget Consideration Toggle */}
            <Form.Group className="mt-3">
              <Form.Label>Do you have a budget preference?</Form.Label>
              <div>
                <Form.Check inline label="Yes" type="radio" checked={budgetConsideration} onChange={() => setBudgetConsideration(true)} />
                <Form.Check inline label="No" type="radio" checked={!budgetConsideration} onChange={() => setBudgetConsideration(false)} />
              </div>
            </Form.Group>

            {budgetConsideration && (
              <Form.Group className="mt-2">
                <Form.Label>Enter your budget (SGD)</Form.Label>
                <Form.Control type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
              </Form.Group>
            )}

            {/* Dietary Restrictions Dropdown */}
            <Form.Group className="mt-3">
              <Form.Label>Dietary Restrictions</Form.Label>
              <Form.Select value={diet} onChange={(e) => setDiet(e.target.value)}>
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Muslim">Muslim (Halal)</option>
                <option value="No Beef">No Beef</option>
                <option value="No Pork">No Pork</option>
              </Form.Select>
            </Form.Group>

            {/* Preferred Language of Instruction */}
            <Form.Group className="mt-3">
              <Form.Label>Preferred Language of Instruction</Form.Label>
              <Form.Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="No Preference">No Preference</option>
                <option value="English">English</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Malay">Malay</option>
                <option value="Tamil">Tamil</option>
                <option value="Bilingual (English + Mandarin)">Bilingual (English + Mandarin)</option>
              </Form.Select>
            </Form.Group>

            {/* Preschool Type Preference */}
            <Form.Group className="mt-3">
              <Form.Label>Preschool Type</Form.Label>
              <Form.Select value={preschoolType} onChange={(e) => setPreschoolType(e.target.value)}>
                <option value="No Preference">No Preference</option>
                <option value="Montessori">Montessori</option>
                <option value="Play-Based">Play-Based</option>
                <option value="Academic-Focused">Academic-Focused</option>
                <option value="Religious-Based">Religious-Based</option>
              </Form.Select>
            </Form.Group>

            {/* Operating Hours Preference */}
            <Form.Group className="mt-3">
              <Form.Label>Operating Hours</Form.Label>
              <Form.Select value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)}>
                <option value="No Preference">No Preference</option>
                <option value="Half-Day (AM/PM)">Half-Day (AM/PM)</option>
                <option value="Full-Day">Full-Day</option>
                <option value="Extended Hours">Extended Hours</option>
              </Form.Select>
            </Form.Group>

            {/* Transport Availability Toggle */}
            <Form.Group className="mt-3">
              <Form.Check type="checkbox" label="Do you require transport services?" checked={transport} onChange={() => setTransport(!transport)} />
            </Form.Group>

            {/* Special Needs Support Toggle */}
            <Form.Group className="mt-3">
              <Form.Check type="checkbox" label="Does your child have special needs?" checked={specialNeeds} onChange={() => setSpecialNeeds(!specialNeeds)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AiModal;
