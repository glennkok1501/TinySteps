import Sidebar from "../components/navigation/Sidebar";
import { Icon } from '@mdi/react';
import { mdiInformation } from '@mdi/js';

const FinancialSupportPage = () => {
    return (
        <div className="layout-container">
            <Sidebar />
            <main className="main-content">
                <div className="hero-section">
                    <div className="container text-center">
                        <h1 className="display-4 mb-3">Financial Support</h1>
                        <p className="lead">Learn about available preschool subsidies and financial assistance</p>
                    </div>
                </div>

                <div className="container py-4">
                <cite
                    ><a className="text-decoration-none text-muted" href="https://www.madeforfamilies.gov.sg/support-measures/raising-your-child/preschool/subsidies-for-preschool"
                        >Subsidies for Preschool</a
                    ></cite
                    >
                    {/* Basic & Additional Subsidy Section */}
                    <div className="support-section mb-5">
                        <h2 className="section-title">Childcare and Infant Care Subsidies</h2>
                        <div className="info-card">
                            <div className="basic-subsidy mb-4">
                                <h3>Basic Subsidy</h3>
                                <p>Parents with Singapore Citizen children enrolled in licensed childcare centres can receive:</p>
                                <ul>
                                    <li>Up to $600 per month for full-day infant care</li>
                                    <li>Up to $300 per month for full-day childcare</li>
                                </ul>
                            </div>
                            
                            <div className="additional-subsidy">
                                <h3>Additional Subsidy</h3>
                                <p>Working mothers with a gross monthly household income of $12,000 and below are eligible for Additional Subsidy on top of the Basic Subsidy. Lower-income families receive higher subsidies.</p>
                                <div className="alert alert-info">
                                    <Icon path={mdiInformation} size={0.8} className="me-2" />
                                    Families with 5 or more members can calculate subsidies based on per capita income (PCI).
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subsidy Tables */}
                    <div className="support-section mb-5">
                        <h3 className="mb-4">Monthly Subsidy for Full-Day Childcare</h3>
                        <i>(For Singapore Citizen children aged 18 months to below seven years old)</i>
                        <div className="table-responsive">
                            <table className="table subsidy-table">
                                <thead>
                                    <tr>
                                        <th>Monthly Household Income</th>
                                        <th>Gross Monthly Per Capita Income (PCI)</th>
                                        <th>Basic Subsidy</th>
                                        <th>Additional Subsidy</th>
                                        <th>Total Subsidy</th>
                                    </tr>
                                </thead>
                                <tbody>
                
                                    <tr>
                                    <td>
                                    <b>
                                    Working Mothers</b>
                                    </td>
                                    <td>
                                    $3,000 and below</td>
                                    <td>
                                    $750 and below</td>
                                    <td>
                                    $300</td>
                                    <td>
                                    $467</td>
                                    <td>
                                    $767</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $3,001 - $4,500</td>
                                    <td>
                                    $751 - $1,125</td>
                                    <td>
                                    $300</td>
                                    <td>
                                    $440</td>
                                    <td>
                                    $740</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $4,501 - $6,000</td>
                                    <td>
                                    $1,126 - $1,500</td>
                                    <td>
                                    $300</td>
                                    <td>
                                    $340</td>
                                    <td>
                                    $640</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $6,001 - $7,500</td>
                                    <td>
                                    $1,501 - $1,875</td>
                                    <td>
                                    $300</td>
                                    <td>
                                    $260</td>
                                    <td>
                                    $560</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $7,501 - $9,000</td>
                                    <td>
                                    $1,876 - $2,250</td>
                                    <td>
                                    $300</td>
                                    <td>
                                    $190</td>
                                    <td>
                                    $490</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $9,001 - $10,500</td>
                                    <td>
                                    $2,251 - $2,625</td>
                                    <td>
                                    $300</td>
                                    <td>
                                    $130</td>
                                    <td>
                                    $430</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $10,501 - $12,000</td>
                                    <td>
                                    $2,626 - $3,000</td>
                                    <td>
                                    $300</td>
                                    <td>
                                    $80</td>
                                    <td>
                                    $380</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    Above $12,000</td>
                                    <td>
                                    Above $3,000</td>
                                    <td>
                                    $300</td>
                                    <td>
                                    N/A</td>
                                    <td>
                                    $300</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <b>
                                    Non-Working Mothers</b>
                                    </td>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $150</td>
                                    <td>
                                    N/A</td>
                                    <td>
                                    $150</td>
                                    </tr>
                                    </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="support-section mb-5">
                        <i>(For Singapore Citizen children aged between two and 18 months)</i>
                        <div className="table-responsive">
                            <table className="table subsidy-table">
                                <thead>
                                    <tr>
                                        <th>Monthly Household Income</th>
                                        <th>Gross Monthly Per Capita Income (PCI)</th>
                                        <th>Basic Subsidy</th>
                                        <th>Additional Subsidy</th>
                                        <th>Total Subsidy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>
                                    $3,000 and below</td>
                                    <td>
                                    $750 and below</td>
                                    <td>
                                    $600</td>
                                    <td>
                                    $710</td>
                                    <td>
                                    $1,310</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $3,001 - $4,500</td>
                                    <td>
                                    $751 - $1,125</td>
                                    <td>
                                    $600</td>
                                    <td>
                                    $640</td>
                                    <td>
                                    $1,240</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $4,501 - $6,000</td>
                                    <td>
                                    $1,126 - $1,500</td>
                                    <td>
                                    $600</td>
                                    <td>
                                    $500</td>
                                    <td>
                                    $1,100</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $6,001 - $7,500</td>
                                    <td>
                                    $1,501 - $1,875</td>
                                    <td>
                                    $600</td>
                                    <td>
                                    $380</td>
                                    <td>
                                    $980</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $7,501 - $9,000</td>
                                    <td>
                                    $1,876 - $2,250</td>
                                    <td>
                                    $600</td>
                                    <td>
                                    $240</td>
                                    <td>
                                    $840</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $9,001 - $10,500</td>
                                    <td>
                                    $2,251 - $2,625</td>
                                    <td>
                                    $600</td>
                                    <td>
                                    $100</td>
                                    <td>
                                    $700</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $10,501 - $12,000</td>
                                    <td>
                                    $2,626 - $3,000</td>
                                    <td>
                                    $600</td>
                                    <td>
                                    $40</td>
                                    <td>
                                    $640</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    Above $12,000</td>
                                    <td>
                                    Above $3,000</td>
                                    <td>
                                    $600</td>
                                    <td>
                                    N/A</td>
                                    <td>
                                    $600</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    <b>
                                    Non-Working Mothers</b>
                                    </td>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    &nbsp;</td>
                                    <td>
                                    $150</td>
                                    <td>
                                    N/A</td>
                                    <td>
                                    $150</td>
                                    </tr>
                                    </tbody>
                            </table>
                        </div>
                    </div>

                    {/* KiFAS Section */}
                    <div className="support-section mb-5">
                        <h2 className="section-title">Kindergarten Fee Assistance Scheme (KiFAS)</h2>
                        <div className="info-card">
                            <p>Available for Singaporean children enrolled in:</p>
                            <ul>
                                <li>Anchor Operator Kindergartens</li>
                                <li>MOE Kindergartens</li>
                            </ul>
                            <p>Eligible for families with gross monthly household income of $12,000 and below.</p>
                        
                            <div className="support-section mb-5">
                        <i>(For Singapore Citizen children enrolled in kindergartens run by Anchor Operators or MOE)</i>
                        <div className="table-responsive">
                            <table className="table subsidy-table">
                                <thead>
                                    <tr>
                                        <th>Monthly Household Income</th>
                                        <th>Gross Monthly Per Capita Income (PCI)</th>
                                        <th> Max KiFAS^</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>
                                    &nbsp;$3,000 and below</td>
                                    <td>
                                    $750 and below&nbsp;</td>
                                    <td>
                                    $161</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;$3,001 - $4,500</td>
                                    <td>
                                    $751 - $1,125&nbsp;</td>
                                    <td>
                                    &nbsp;$150</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;$4,501 - $6,000</td>
                                    <td>
                                    $1,126 - $1,500&nbsp;</td>
                                    <td>
                                    &nbsp;$107</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;$6,001 - $7,500</td>
                                    <td>
                                    $1,501 - $1,875&nbsp;</td>
                                    <td>
                                    &nbsp;$87</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;$7,501 - $9,000</td>
                                    <td>
                                    &nbsp;$1,876 - $2,250</td>
                                    <td>
                                    &nbsp;$67</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;$9,001 - $10,500</td>
                                    <td>
                                    $2,251 - $2,625&nbsp;</td>
                                    <td>
                                    &nbsp;$47</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;$10,501 - $12,000</td>
                                    <td>
                                    &nbsp;$2,626 - $3,000</td>
                                    <td>
                                    &nbsp;$17</td>
                                    </tr>
                                    <tr>
                                    <td>
                                    &nbsp;Above $12,000</td>
                                    <td>
                                    &nbsp;Above $3,000</td>
                                    <td>
                                    &nbsp;N/A</td>
                                    </tr>
                                    </tbody>
                            </table>
                        </div>
                    </div>
                        </div>
                    </div>
            

                    {/* Application Process */}
                    <div className="support-section">
                        <h2 className="section-title">How to Apply</h2>
                        <div className="process-cards">
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="process-card">
                                        <div className="process-number">1</div>
                                        <h4>Submit Application</h4>
                                        <p>Apply through your preschool centre. The centre will provide you with the application form.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="process-card">
                                        <div className="process-number">2</div>
                                        <h4>Assessment</h4>
                                        <p>Your application will be assessed based on household income and eligibility criteria.</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="process-card">
                                        <div className="process-number">3</div>
                                        <h4>Receive Subsidies</h4>
                                        <p>Subsidies will be disbursed directly to your preschool centre. Pay only the net fees after subsidy.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}; 

export default FinancialSupportPage;