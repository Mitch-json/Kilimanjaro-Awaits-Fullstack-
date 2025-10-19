import React from 'react'

function RongaiDetails() {
    const displayDetail = (detailID) => {
        console.log(document.body.querySelector(`#${detailID}`).classList[1])
        if(document.body.querySelector(`#${detailID}`).classList[1]){
            document.body.querySelector(`#${detailID}`).classList.remove('ac-text-visible')
        }else{

            document.body.querySelector(`#${detailID}`).classList.add('ac-text-visible')
        }
    }
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                <div className="ac">
                    <label className="ac-label" onClick={(e)=>displayDetail('ac-1')} >Pre-Trip Preparations Checklist</label>
                    <article id="ac-1" className="ac-text">
                        <ul>
                            <li>
                                <a href="" target="_blank" rel="noopener">Tanzania Safari – Pre-Trip Prep Checklist</a>
                            </li>
                        </ul>
                    </article>
                </div>
                <div className="ac">
                    <label className="ac-label" onClick={(e)=>displayDetail('ac-2')} >Packing Checklist</label>
                    <article id="ac-2" className="ac-text">
                        <ul>
                            <li>
                                <a href="" target="_blank" rel="noopener">Tanzania Safari – Packing Checklist</a>
                            </li>
                        </ul>
                    </article>
                </div>
            </div>

        </div>
    )
}

export default RongaiDetails
