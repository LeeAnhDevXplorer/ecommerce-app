import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaGoogle } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import './Login.css';

import Button from '@mui/material/Button';

const Login = () => {
  const context = useContext(MyContext);
  const [isShowPass, setisShowPass] = useState(false);
  useEffect(() => {
    context.setisHide(false);

    // Cleanup function để reset giá trị khi component unmount
    return () => {
      context.setisHide(true);
    };
  }, [context]);
  return (
    <div>
      <div className="maincontainer">
        <div
          className="form-group link_wrapper"
          style={{
            width: '250px',
          }}
        >
          {/* Nút trở về trang Home */}
          <Link to={'/'} className="btn btn-home">
            <Button>Go To Home</Button>
          </Link>
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 268.832 268.832"
            >
              <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
            </svg>
          </div>
        </div>
        <div className="container">
          <div className="card bg-light">
            <article
              className="card-body mx-auto"
              style={{ maxWidth: '400px' }}
            >
              <h4 className="card-title mt-3 text-center">Đăng nhập</h4>
              <p className="text-center">Chào mừng bạn trở lại</p>
              <div className="d-flex align-items-center justify-content-center">
                <Button>
                  <Link to={'#'} className="btn btn-block btn-twitter">
                    <FaGoogle /> Login via Google
                  </Link>
                </Button>
                <Button>
                  <Link to={'#'} className="btn btn-block btn-facebook">
                    <i className="fab fa-facebook-f"></i> Login via facebook
                  </Link>
                </Button>
              </div>
              <p className="divider-text">
                <span className="bg-light">OR</span>
              </p>
              <form>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    name=""
                    className="form-control"
                    placeholder="Email address"
                    type="email"
                  />
                </div>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Create password"
                    type={`${isShowPass === true ? 'text' : 'password'}`}
                  />
                  <span
                    className="showTogglePass"
                    onClick={() => setisShowPass(!isShowPass)}
                  >
                    {isShowPass === true ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="form-group">
                  <Button
                    variant="contained"
                    type="button"
                    className="btn btn-primary btn-block"
                  >
                    Đăng nhập
                  </Button>
                </div>
                <p className="text-center">
                  Bạn chưa có tài khoản? <Link to={'/signup'}>Đăng ký</Link>
                </p>
              </form>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
