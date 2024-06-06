import React, { useState , useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesChildrens, setCategoriesChildrens] = useState([]);
  const [menuOpened, SetMenuOpened] = useState(false)
  const [categoryHighlited , setCategoryHighlited] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(
    () => {
      const fetchCats = async () => {
        const cats = await fetch('http://localhost:4000/api/categories')
        const Catsjson = await cats.json()
        if (cats.ok) {
          setCategories(Catsjson)
          console.log('catjson',Catsjson)
        }
      }

      fetchCats()
    }, []
  )
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      SetMenuOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleChildCat = (id) => {
    setCategoryHighlited(true);
  const cat = categories.find((cat) => cat._id === id);
  if (cat) {
    setCategoriesChildrens(cat.children);
  }
  console.log(cat ? cat.children : 'Category not found');

  }
  return (
    <div className='navbar'>
      <nav className="navbar sticky-top navbar-expand bark-header  body-min-width header-shadow background-color-white py-0" id="bark-header">
        <Link to={'/'} className='navbar-brand not-logged-in'>

          <img className="img-fluid loading" src="https://d18jakcjgoan9.cloudfront.net/s/img/images/barklogo-dark.png!d=KY4fXZ" width="106" height="32" title="Bark Logo" alt="Bark Logo" data-was-processed="true" />
        </Link>

        <div className="js-explore-container explore-container ml-0 ml-sm-1">
          <span className="js-trigger-explore trigger-explore cursor-pointer" onClick={() => SetMenuOpened(!menuOpened)}>
            <span className="align-middle hover-underline">
              Explore
            </span>
            <span className="align-middle trigger-explore-chevron d-inline-block">
              <span className="bark-svg-icon bsi-primary-dark-blue bsi-xs d-inline-block w-100">
                <svg width="10px" height="6px" viewBox="0 0 10 6"
                  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

                  <g id="Guide-" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Style-Guide" transform="translate(-344.000000, -10881.000000)">
                      <g id="Icons/Illustrations" transform="translate(115.000000, 10318.000000)">
                        <g id="Icons" transform="translate(22.000000, 242.000000)">
                          <g id="Icon/arrow_down" transform="translate(206.000000, 320.000000)">
                            <g id="arrow_down">
                              <rect id="base" fillRule="nonzero" x="0" y="0" width="12" height="8"></rect>
                              <path d="M6.63460593,6.744 C6.28160593,7.084 5.75960593,7.085 5.40560593,6.748 L1.33160593,2.863 C0.934605927,2.484 0.887605927,1.818 1.22560593,1.374 C1.40460593,1.139 1.66760593,1.003 1.94360593,1.003 L10.0556059,1 C10.5766059,1 10.9996059,1.472 10.9996059,2.056 C11.0006059,2.363 10.8796059,2.655 10.6716059,2.856 L6.63460593,6.744 Z" id="arrow-down" className="primary-color"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span></span></span>
          {menuOpened &&
            <div ref={dropdownRef} className={`js-explore-items-container explore-items-container bg-white border border-grey-100 rounded mt-2 overflow-auto ${categoryHighlited && 'highlighting-category'} `} >
              <div className="js-explore-mobile-header explore-mobile-headers no-gutters px-4">
                <div className="col-6 d-flex align-items-center"><span className="mobile-explore-text">Explore</span></div>
                <div className="col-6 d-flex align-items-center justify-content-end">
                  <span className="close-mobile-explore js-close-mobile-explore"></span>
                </div>
              </div>
              <div className="d-flex no-gutters overflow-x-hidden h-100">
                <div className="js-first-page first-page py-4 px-4 col-12">
                  <div className="explore-categories">
                    <div className="d-flex justify-content-between no-gutters mb-3">
                      <p className="mr-5 mb-0">Services</p>
                      <a href="#" data-n="click:main" data-i="see-all" className="js-xrt text-grey-600 text-hover-dark-blue text-focus-dark-blue text-xs-14"><u>See all</u></a>
                    </div>
                    <div className="category-links">
                    {categories && categories.map((cat) => (
                      <a href="#" className="js-explore-pseudo-link d-flex no-gutters text-xs-14 text-grey-600 text-hover-dark-blue text-focus-dark-blue justify-content-between py-1" onClick={() => handleChildCat(cat._id)}>
                        <div className="d-flex align-items-center">
                          <span className="explore-icon-container mr-3">
                            <span className="bark-svg-icon bsi-primary-grey-400">
                              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g className="explore-business" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                  <g>
                                    <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                    <path d="M15,17 L9,17 L9,16 L5,16 L5,19 L19,19 L19,16 L15,16 L15,17 Z M4,14 L9,14 L9,11 L15,11 L15,14 L20,14 L20,9 L4,9 L4,14 Z" className="secondary-color" fillRule="nonzero"></path>
                                    <path d="M20,7 L16,7 L16,5 L14,3 L10,3 L8,5 L8,7 L4,7 C2.9,7 2,7.9 2,9 L2,14 C2,14.75 2.4,15.38 3,15.73 L3,19 C3,20.11 3.89,21 5,21 L19,21 C20.11,21 21,20.11 21,19 L21,15.72 C21.59,15.37 22,14.73 22,14 L22,9 C22,7.9 21.1,7 20,7 Z M10,5 L14,5 L14,7 L10,7 L10,5 Z M19,19 L5,19 L5,16 L9,16 L9,17 L15,17 L15,16 L19,16 L19,19 Z M11,15 L11,13 L13,13 L13,15 L11,15 Z M20,14 L15,14 L15,11 L9,11 L9,14 L4,14 L4,9 L20,9 L20,14 Z" className="primary-color" fillRule="nonzero"></path>
                                  </g>
                                </g>
                              </svg>
                            </span>
                          </span>

                          <span>{cat.name}</span>
                        </div>
                        <span className="bark-svg-icon bsi-primary-grey-600 bsi-sm ml-2 cursor-pointer arrow-right" >
                          <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g id="Icon/chevron_right" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g id="chevron_right">
                                <rect id="base" fillRule="nonzero" x="0" y="0" width="24" height="24"></rect>
                                <polygon className="primary-color" id="Path" fill="none" points="8 17 13.2928932 11.7071068 8 6.41421356 9.41421356 5 16.1213203 11.7071068 9.41421356 18.4142136"></polygon>
                              </g>
                            </g>
                          </svg></span>
                      </a>
                      ))}
                    </div></div></div>
                    {categoriesChildrens && categoriesChildrens.length > 0 && categoriesChildrens.map(
                      (catChild) => (
                        
                <div className="js-second-page second-page py-4 px-4 col-12">
                  <div className="js-second-page-inner">
                    <div className="back-to-explore pb-3 border-bottom border-grey-100" onClick={() => setCategoryHighlited(false)}>
                      <span className="js-explore-back-to-main cursor-pointer">
                        <span className="bark-svg-icon bsi-primary-dark-blue bsi-sm d-inline-block align-middle mr-2">
                          <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <g transform="translate(4.000000, 5.000000)" className="primary-color">
                                <path d="M4.41421356,6 L15,6 L15,8 L4.41421356,8 L8.70710678,12.2928932 L7.29289322,13.7071068 L0.585786438,7 L7.29289322,0.292893219 L8.70710678,1.70710678 L4.41421356,6 Z"></path>
                              </g>
                            </g>
                          </svg>
                        </span>
                        <span className="align-middle hover-underline" >Back to Explore</span>
                      </span>
                    </div>
                    <div className="js-explore-category-container js-explore-category-business parent-category-list">
                      <div className="d-flex no-gutters text-xs-14 justify-content-between py-4">
                        <div className="d-flex align-items-center text-lg">
                          <span className="bark-svg-icon bsi-primary-grey-600 mr-2">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                              <g className="explore-business" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g>
                                  <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                  <path d="M15,17 L9,17 L9,16 L5,16 L5,19 L19,19 L19,16 L15,16 L15,17 Z M4,14 L9,14 L9,11 L15,11 L15,14 L20,14 L20,9 L4,9 L4,14 Z" className="secondary-color" fill-rule="nonzero"></path>
                                  <path d="M20,7 L16,7 L16,5 L14,3 L10,3 L8,5 L8,7 L4,7 C2.9,7 2,7.9 2,9 L2,14 C2,14.75 2.4,15.38 3,15.73 L3,19 C3,20.11 3.89,21 5,21 L19,21 C20.11,21 21,20.11 21,19 L21,15.72 C21.59,15.37 22,14.73 22,14 L22,9 C22,7.9 21.1,7 20,7 Z M10,5 L14,5 L14,7 L10,7 L10,5 Z M19,19 L5,19 L5,16 L9,16 L9,17 L15,17 L15,16 L19,16 L19,19 Z M11,15 L11,13 L13,13 L13,15 L11,15 Z M20,14 L15,14 L15,11 L9,11 L9,14 L4,14 L4,9 L20,9 L20,14 Z" className="primary-color" fill-rule="nonzero"></path>
                                </g>
                              </g>
                            </svg>
                          </span>

                          <span> {catChild.parentId.name}</span>
                        </div>
                        <a href="/en/gb/business/" className="js-xrt text-xs-14 text-grey-600" data-n="click:child" data-i="see-all"><u>See all</u></a>
                      </div>
                      <div className="category-links">
                        <div>
                          <a className="js-xrt text-xs-14 text-grey-600 py-1 d-inline-block text-hover-dark-blue text-focus-dark-blue" data-n="click:child" data-i="accountants" href="/en/gb/accountants/">{catChild.name}</a>
                        </div>
                      </div></div></div></div>
                      )
                    )}

              </div>
            </div>
          }

        </div>

      </nav>


      <div className='buttons'>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
        <Link to={'/seller-register'}> Seller Register</Link>
      </div>
    </div>
  )
}
export default Navbar