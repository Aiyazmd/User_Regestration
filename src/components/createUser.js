import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
const CreateUser = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    let navigate = useNavigate();
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0,
              v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }


      const validateForm = (obj, isChange) => {
        debugger
        const { fullName,phoneNumer,  email, password, companyName } = isChange ? obj : form
        const newErrors = {};
        const reg = /<(.|\n)*?>/g;
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        
        if (!fullName || fullName === '') {
          newErrors.fullName = "Is required";
        } 
    
        if (!phoneNumer || phoneNumer === '') {
          newErrors.phoneNumer = "Is required";
        } else if (phoneNumer && (reg.test(phoneNumer))) {
          newErrors.phoneNumer = "Invalid phone number";
        }
    
        if (!email || email == '') {
          newErrors.email = "Is required";
        } else if (emailReg == false) {
          newErrors.email = "Invalid email";
        }
    
        if (!password || password === '') {
            newErrors.password = "Is required";
          } 
          if (!companyName || companyName === '') {
            newErrors.companyName = "Is required";
          } 
       
       
        return newErrors;
      }  
    const handleSubmit = () => {
        debugger
        let obj = {
            userId:generateUUID(),
            fullName: form.fullName,
            phoneNumer: form.phoneNumer,
            email: form.email,
            password: form.password,
            companyName: form.companyName,
            agency:form.agency
        }
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
        }else{
            fetch(`http://localhost:3030/userDetails`,{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(obj)
            })
            .then(()=>{
                setValidated(false);
             alert("Data saved successfully")
             setTimeout(()=>{
                navigate(`/userdetails/${obj.userId}`)
             },2000)
            }).catch((err)=>{
                 console.log(err)
               })
               setValidated(true);
        }
        
        
    }
    return (
        <div className='main-card mx-auto'>
            <h2>Create your</h2>
            <h2 className='mb-4'>PopX account</h2>
            <Form noValidate validated={validated} >

           

                <FloatingLabel  controlId="floatingInput" label="Full Name*" className="input-style">
                    <Form.Control
                        type="text"
                        name="fullName"
                        value={form?.fullName}
                        onChange={(e) => { setField('fullName', e.currentTarget.value) }}
                        required
                        isInvalid={!!errors.fullName}
                        placeholder="Full Name"
                        maxLength={50}
                    />
                    <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errors.fullName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel  controlId="floatingInput" label="Phone number*" className="input-style">
                    <Form.Control
                        type="text"
                        name="phoneNumer"
                        value={form?.phoneNumer}
                        onChange={(e) => { setField('phoneNumer', e.currentTarget.value) }}
                        required
                        isInvalid={!!errors.phoneNumer}
                        placeholder="Phone number"
                        maxLength={50}
                    />
                    <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errors.phoneNumer}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel  controlId="floatingInput" label="Email address*" className="input-style">
                    <Form.Control
                        type="text"
                        name="email"
                        value={form?.email}
                        onChange={(e) => { setField('email', e.currentTarget.value) }}
                        required
                        isInvalid={!!errors.email}
                        placeholder="Email address"
                        maxLength={50}
                    />
                    <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errors.email}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel  controlId="floatingInput" label="Password*" className="input-style">
                    <Form.Control
                        type="text"
                        name="password"
                        value={form?.password}
                        onChange={(e) => { setField('password', e.currentTarget.value) }}
                        required
                        isInvalid={!!errors.password}
                        placeholder="Password"
                        maxLength={50}
                    />
                    <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errors.password}</Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel  controlId="floatingInput" label="Company name" className="input-style">
                    <Form.Control
                        type="text"
                        name="companyName"
                        value={form?.companyName}
                        onChange={(e) => { setField('companyName', e.currentTarget.value) }}
                        required
                        isInvalid={!!errors.companyName}
                        placeholder="Company name"
                        maxLength={50}
                    />
                    <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errors.companyName}</Form.Control.Feedback>
                </FloatingLabel>
                <div>
                    <h6>Are you an Agency?*</h6>
                    <div className='flux'>
                    <div class="form-check ">
  <input class="form-check-input" onChange={(e) => { setField('agencyYes', e.currentTarget.value) }} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
  <label class="form-check-label" for="flexRadioDefault1">
    Yes
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" onChange={(e) => { setField('agencyNo', e.currentTarget.value) }} type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
  <label class="form-check-label" for="flexRadioDefault2">
    No
  </label>
</div>
                          
                       
                    </div>
                </div>
                <div className='btn-bottom mt-5'>
                <Button className="fill-btn m-0 ms-6 submit-spinner" type="button" onClick={() => handleSubmit()} >
                    Create Account
                </Button>
                </div>
                
            </Form>
            
        </div>

    )
}

export default CreateUser