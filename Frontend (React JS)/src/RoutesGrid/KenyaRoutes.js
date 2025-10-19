import React from 'react'
import { Link } from 'react-router-dom'

const MtKenyaRoutes = [
    {
        key: 1,
        imageUrl: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1713559173/kilimaj-hiking/Mt-Kenya-Routes/Chogoria-Route.jpg",
        routeName: 'Chogoria Route',
        routeLink: 'chogoria-route',
        description: 'The route is often described as the most attractive route on Mount Kenya. However, there is no hut for its high camp and it is quite a bit longer',
        difficulty: 'Hard',
        days: 6,
        price: '1,000',
    },
    {
        key: 3,
        imageUrl: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1713559166/kilimaj-hiking/Mt-Kenya-Routes/Naro-Moru-Route.jpg",
        routeName: 'Naro Moru Route',
        routeLink: 'naro-moru-route',
        description: 'This route used to be by far the most popular route as it is relatively short and has huts at Met Station (3050m) and MacKinders (4200m).',
        difficulty: 'Medium',
        days: 4,
        price: '1,000',
    },
    {
        key: 5,
        imageUrl: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1713559162/kilimaj-hiking/Mt-Kenya-Routes/Sirimon-Route.jpg",
        routeName: 'Sirimon Route',
        routeLink: 'sirimon-route',
        description: 'The route is usually considered one of the easier routes as it climbs relatively gradually with only a couple of steeper sections.',
        difficulty: 'Easy',
        days: 4,
        price: '1,000',
    },
];

function KenyaRoutes() {
  return (
    <>
        {
            MtKenyaRoutes.map((route) => (
                <Link to={`/routes/selected/mt-kenya/${route.routeLink}`} className={`grid-item cat-${route.key}`}>
                    <div className="cnt-box cnt-box-info boxed" data-href="treks-single.html">
                        <div className="extra-field">From ${route.price}</div>
                        <div className="img-box" >
                            <img src={route.imageUrl} alt="" />
                        </div>
                        <div className="caption">
                            <h2>{route.routeName} </h2>
                            <div className="cnt-info">
                                <div><span>Days</span><span>{route.days} </span></div>
                                <div><span>Difficulty</span><span>{route.difficulty} </span></div>
                            </div>
                            <p>
                                {route.description}
                            </p>
                            <div className="bottom-info">
                                <i class="fa-solid fa-location-dot"></i>
                                Mt Kenya, Kenya
                            </div>
                        </div>
                    </div>
                </Link>

            ))
        }
    </>
  )
}

export default KenyaRoutes