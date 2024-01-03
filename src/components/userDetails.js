import React, { useEffect, useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import defaultAvathar from "../assets/images/default-avatar.jpg"
import { useNavigate, useParams } from "react-router-dom";
const UserDetails = () => {
  const [imageValidtion, setImageValidation] = useState('');
  const [userDetails, setUserDetails] = useState()
  let navigate = useNavigate();
  let userId = useParams();
  useEffect(() => {
    getUserDetails(userId)
  }, [])

  const getUserDetails = (userId) => {
    fetch(`http://localhost:3030/userDetails`)
      .then((res) => {
        return res.json()
      }).then((resp) => {
        console.log(resp)
        let data= resp.find((item)=>item.userId==userId?.userId)
        setUserDetails(data)
      }).catch((err) => {
        console.log(err)
      })
  }
  const handleBack = () => {
    navigate("/")
  }

  const handleUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setImageValidation('File is not allowed. You can upload jpg, png, jpeg files.');

      } else {
        // uploadToServer(file);
      }
    }
  };

  return (<>

    <div className='container'>
      <div className='accountHeader'>Account Settings</div>
      <div style={{ padding: "20px" }}>
        <Form>
          <div style={{ display: "flex" }}>
            <div className="profile-size c-pointer upload-profile-mobile">
              <Form.Group>
                <span className="image-box">
                  {' '}
                  <Image
                    className="image-setup mobile-contain"
                    src={defaultAvathar}
                    width="100"
                    height="100"
                    alt=""
                  />{' '}

                </span>
                <span>
                  <input type="file" name="myImage" className="icon camera cam-position" onChange={handleUpload} />
                </span>
              </Form.Group>
            </div>
            <div>
              <p>{userDetails?.fullName}</p>
              <p>{userDetails?.email}</p>
            </div>
          </div>
          <p className="profile-value">{"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"}</p>
          <Button className="fill-btn" onClick={() => handleBack()}>
            Back
          </Button>
        </Form>
      </div>
    </div>
  </>
  )
}

export default UserDetails