import axios from "axios";
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import React from "react";

export default function FlyerForm(props) {

  function handleSubmit(event) {
    event.preventDefault();
    let submitData = {}
    submitData.eventId = props.event.id
    submitData.key = props.event.form.map(({name}) => name).toString().replaceAll(",", "|")
    submitData.description = props.event.description

    for (let index = 0; index < props.event.form.length; index++) {
      const num = index + 1
      submitData['generic ' + num.toString()] = event.target[index].value
    }
    axios.post('/database/rows/table/370/?user_field_names=true',submitData).then(response => console.log(response)).catch(err => console.log(err))
  }


  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className=" sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white py-5 ">

            {props.event.form.map((formItem) => (
              GetFormInput(formItem)
            ))}
            
          </div>
          <div className="px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}


function GetFormInput(formItem) {

  if (formItem.type === 'textarea') {
    return (
      <div id={formItem.id}>
        <div className="mb-2 block">
          <Label htmlFor={formItem.id} value={formItem.name} />
        </div>
        <Textarea
          id={formItem.id}
          placeholder={formItem.placeholder}
          required={formItem.required? formItem.required: false}
          rows={formItem.rows}
          helperText={
            <React.Fragment>
              {formItem.helperText}
            </React.Fragment>
          }
        />
      </div>
    );
  }

  if (formItem.type === "select") {
    return (
      <div id={formItem.id}>
        <div className="mb-2 block">
          <Label htmlFor={formItem.id} value={formItem.name} />
        </div>
        <Select 
        id={formItem.id} 
        required={formItem.required} 
        helperText={formItem.helperText}
        >
          { formItem.options.map((option) => (
            <option>{option}</option>
          )) }
        </Select>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="mb-2 block">
          <Label htmlFor={formItem.id} value={formItem.name} />
        </div>
        <TextInput
          id={formItem.id}
          type={formItem.type}
          placeholder={formItem.placeholder}
          required={formItem.required? formItem.required: false}
          disabled={formItem.disabled}
          readOnly={formItem.readOnly}
          helperText={
            <React.Fragment>
              {formItem.helperText}
            </React.Fragment>
          }
          addon={formItem.addon}
          icon={formItem.icon}
        />
      </div>
    </>
  );
}