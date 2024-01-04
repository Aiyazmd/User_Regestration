import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [form, setForm] = useState({});
    const [userList,setUserList]=useState()
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
    useEffect(()=>{
        getUserList()
      },[])
    
      const getUserList=()=>{
            fetch(`http://localhost:3030/userDetails`)
            .then((res)=>{
             return res.json()
            }).then((resp)=>{
              setUserList(resp)
            }).catch((err)=>{
              console.log(err)
            })
      }

      const validateForm = (obj, isChange) => {
        debugger
        const { email, password } = isChange ? obj : form
        const newErrors = {};
        const reg = /<(.|\n)*?>/g;
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
       
    
        if (!email || email == '') {
          newErrors.email = "Is required";
        } else if (emailReg == false) {
          newErrors.email = "Invalid email";
        }
    
        if (!password || password === '') {
            newErrors.password = "Is required";
          }
        return newErrors;
      }  


    const handleSubmit = () => {
        let obj = {
            email: form.email,
            password: form.password
        }
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
        }else{
            if(obj.password?.length>0){
                let data= userList.find((item)=>item.email==obj.email && item.password==obj.password)
                if(data){
                    setValidated(false);
                    navigate(`/userdetails/${data.id}`)
                }else{
                    alert("Please enter correct details Email or Passward!")  
                }
            }
            setValidated(true);
        }
        
      
        
    }

    return (
        <div className='main-card mx-auto'>
            <h2>Signin to your PopX account</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            <div>
                <Form noValidate validated={validated}>
                    <FloatingLabel controlId="floatingInput" label="Email Address *" className="input-style">
                        <Form.Control
                            type="text"
                            name="email"
                            value={form?.email}
                            onChange={(e) => { setField('email', e.currentTarget.value) }}
                            required
                            isInvalid={!!errors.email}
                            placeholder="Email Address"
                            maxLength={50}
                        />
                         <Form.Control.Feedback type="invalid" style={{color:"red"}}>{errors.email}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Password" className="input-style">
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

                    <Button className="fill-btn m-0 ms-6 submit-spinner" onClick={() => handleSubmit()}>
                        Login
                    </Button>
                </Form>

            </div>

        </div>
    )
}

export default LoginPage