import React, { useEffect,useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import Input from './Input';
import citiesdata from './cities.json'


const App =()=>{

  const [status, setStatus] = useState('WASSPOPPING')
  const [showStatus, setShowStatus] = useState(false)
  const {register, handleSubmit, errors, watch} = useForm({})
  const [cities, setCities] = useState([])
  const [time, setTime] = useState('')
  const password = useRef({})
  password.current = watch("password", "")

  const saveTimeHandler = () =>{
    const newTime = new Date().toLocaleString().split(',').join(' в ')
    setTime(newTime)
  }

  const filterCities = () =>{
     let finalCities = []
     citiesdata.forEach((city)=>city.population > 50000 ? finalCities.push(city):null)
     const finalPopulations = finalCities.map((city)=>+city.population)
     const maxPop = Math.max(...finalPopulations)
     const MaxIndex = finalPopulations.indexOf(maxPop)
     finalCities.unshift(...finalCities.splice(MaxIndex,1))
     setCities(finalCities.map(city=>city.city))
  }
  useEffect(()=>{
     filterCities()
  },[])
  const onSubmit = (dataForm) =>{
     const data = JSON.stringify(dataForm)
     console.log('DATA', data)
  }
    const hideStatus = (e) =>{
      if(e.key === "Enter"){
        setShowStatus(false)
      }
  }
  return (
    <div className="app">
       <div className="container">
          <div className="app__header">
            <div className="header__info">
            <p>Здравствуйте, <strong>Человек №3596941</strong></p>
             <button onClick={()=>setShowStatus(true)}>Сменить статус</button>
            </div>
            <div className="header__status">
              {!showStatus ? (
                  <p>{status}</p>
              ):(
                <input onKeyPress={(e)=>hideStatus(e)} 
                autoFocus={true} 
                onBlur={()=>setShowStatus(false)} 
                value={status} 
                onChange={e => setStatus(e.target.value)}/>
              )}
            </div>
          </div>
          <div className="app__body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="select">
               <p>Ваш город</p>
               <select ref={register} name="city" id="">
                 {cities.map((city)=>(
                   <option value={city}>{city}</option>
                 ))}
               </select>
              </div>
            <div className="password"> 
              <Input 
                 error={errors.password}  
                 register={register({
                  required:'Укажите пароль',minLength:{
                  value:5,
                  message:'Используйте не менее 5 символов'
                }})}
                 name='password' 
                 label="Пароль" 
                 type="password" 
                 text="Ваш новый пароль должен содержать не менее 5 символов."/>
               <Input 
                error={errors.passwordrepeat}  
                register={register({
                  required:'Укажите пароль',
                  validate:value => value === password.current || 'Пароли не совпадают'
                })}
                name='passwordrepeat' 
                label="Пароль еще раз" 
                type="password" 
                text="Повторите пароль, пожалуйста, это обезопасит вас с нами на случай ошибки."/>
               </div>
                <Input 
                error={errors.email} 
                register={register({required:'Укажите E-mail'})}
                name='email' 
                label="Электронная почта" 
                type="email" 
                text="Можно изменить адрес, указанный при регистрации. "/>
                <Input  
                register={register}
                name="checkbox"
                label="Я согласен" 
                type="checkbox" 
                value="принимать актуальную информацию на E-mail."
                checkbox={true} />
                <div className="app__footer">
                     <button onClick={saveTimeHandler} type="submit">Изменить</button>
                    <p>последние изменения {time}</p>
               </div>
            </form>
          </div>
       </div>
    </div>
  );
}

export default App;
