import React from "react"

function Display(props) {

    return (
        <>
            <div className="container">
                <div className="alert alert-success" role="alert" style={{ width: '500px' }}><span style={{ color: '#000' }}><h2><b>Thank You</b></h2>Your Covid-19 health declaration was submitted.</span></div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Temperature</th>
                            <th scope="col">Symptoms</th>
                            <th scope="col">Covid-19 Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{props.personDisplay.name}</th>
                            <td>{props.personDisplay.temperature}</td>
                            <td>{props.personDisplay.symptoms}</td>
                            <td>{props.personDisplay.contact}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary" onClick={props.handleBack} style={{ margin: "20px", width: "100px" }}>Go Back</button>
            </div>
        </>
    )
}
export default Display;