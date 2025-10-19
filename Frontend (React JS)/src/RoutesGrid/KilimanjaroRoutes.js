import React from 'react'
import { Link } from 'react-router-dom'

function KilimanjaroRoutes() {
  return (
    <>
        <Link to="/routes/selected/northern-circuit-route" className="grid-item cat-1">
            <div className="cnt-box cnt-box-info boxed" data-href="treks-single.html">
                <div className="extra-field">From $2,500</div>
                <div className="img-box" >
                    <img src={require('../assets/routes/northern-circuit.jpg')} alt="" />
                </div>
                <div className="caption">
                    <h2>Northern Circuit Route</h2>
                    <div className="cnt-info">
                        <div><span>Days</span><span>7</span></div>
                        <div><span>Difficulty</span><span>Hard</span></div>
                    </div>
                    <p>
                        Regarded as one of the best routes up Kilimanjaro, the Northern route is also among the newest.
                    </p>
                    <div className="bottom-info">
                        Mt Kilimanjaro, Tanzania
                    </div>
                </div>
            </div>
        </Link>
        <div className="grid-item cat-2" >
            <div className="cnt-box cnt-box-info boxed" data-href="treks-single.html">
                <div className="extra-field">From $2,500</div>
                <Link className="img-box" to="/routes/selected/lemosho-route">
                    <img src={require('../assets/routes/lemosho.jpg')} alt="" />
                </Link>
                <div className="caption">
                    <h2>Lemosho Route</h2>
                    <div className="cnt-info">
                        <div><span>Days</span><span>7</span></div>
                        <div><span>Difficulty</span><span>Medium</span></div>
                    </div>
                    <p>
                        This route is considered by many as the most beautiful route up Kilimanjaro
                    </p>
                    <div className="bottom-info">
                        Mt Kilimanjaro, Tanzania
                    </div>
                </div>
            </div>
        </div>
        <div className="grid-item cat-1 cat-3 cat-4">
            <div className="cnt-box cnt-box-info boxed" data-href="treks-single.html">
                <div className="extra-field">From $2,500</div>
                <Link className="img-box" to="/routes/selected/machame-route">
                    <img src={require('../assets/routes/machame.jpg')} alt="" />
                </Link>
                <div className="caption">
                    <h2>Machame Route</h2>
                    <div className="cnt-info">
                        <div><span>Days</span><span>7</span></div>
                        <div><span>Difficulty</span><span>Hard</span></div>
                    </div>
                    <p>
                        This Route is considered fairly difficult and is well suited to the more adventurous.
                    </p>
                    <div className="bottom-info">
                        Mt Kilimanjaro, Tanzania
                    </div>
                </div>
            </div>
        </div>
        <div className="grid-item cat-2">
            <div className="cnt-box cnt-box-info boxed" data-href="treks-single.html">
                <div className="extra-field">From $2,500</div>
                <Link className="img-box" to="/routes/selected/rongai-route">
                    <img src={require('../assets/routes/rongai.jpg')} alt="" />
                </Link>
                <div className="caption">
                    <h2>Rongai Route</h2>
                    <div className="cnt-info">
                        <div><span>Days</span><span>7</span></div>
                        <div><span>Difficulty</span><span>Medium</span></div>
                    </div>
                    <p>
                        It is a route gaining traction and a recommended option for those looking to stay away from the crowds.
                    </p>
                    <div className="bottom-info">
                        Mt Kilimanjaro, Tanzania
                    </div>
                </div>
            </div>
        </div>
        <div className="grid-item cat-1">
            <div className="cnt-box cnt-box-info boxed" data-href="treks-single.html">
                <div className="extra-field">From $2,500</div>
                <Link className="img-box" to="/routes/selected/marangu-route">
                    <img src={require('../assets/routes/marangu.jpg')} alt="" />
                </Link>
                <div className="caption">
                    <h2> Marangu “Coca-Cola” Route</h2>
                    <div className="cnt-info">
                        <div><span>Days</span><span>7</span></div>
                        <div><span>Difficulty</span><span>Hard</span></div>
                    </div>
                    <p>
                        The route is 69km in length being the most classic trek up the mountain.
                    </p>
                    <div className="bottom-info">
                        Mt Kilimanjaro, Tanzania
                    </div>
                </div>
            </div>
        </div>
        <div className="grid-item cat-2">
            <div className="cnt-box cnt-box-info boxed" data-href="treks-single.html">
                <div className="extra-field">From $2,500</div>
                <Link className="img-box" to="/routes/selected/umbwe-route">
                    <img src={require('../assets/routes/umbwe.jpg')} alt="" />
                </Link>
                <div className="caption">
                    <h2>Umbwe Route</h2>
                    <div className="cnt-info">
                        <div><span>Days</span><span>7</span></div>
                        <div><span>Difficulty</span><span>Hard</span></div>
                    </div>
                    <p>
                        The Umbwe route is not often used and said to be the most demanding on the mountain.
                    </p>
                    <div className="bottom-info">
                        Mt Kilimanjaro, Tanzania 
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default KilimanjaroRoutes