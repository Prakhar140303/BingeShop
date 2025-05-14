import React from 'react'
import {Label} from '../ui/label'
import {Input} from '../ui/input'
import { Button } from '../ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Select, SelectContent, SelectItem, SelectTrigger} from '../ui/select'
import { SelectValue } from '@radix-ui/react-select';
import {motion} from 'framer-motion'

const MotionButton = motion(Button);
function CommonForm({formControls, formData, setFormData,onSubmit, buttonText ,isButtonDisabled}) {
    function renderInputsByComponentType(getControlItem){
        let element = null;
        const value = formData[getControlItem.name] || '';

        switch(getControlItem.componentType){
            case 'input':
                element =( <Input 
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id ={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange ={event => setFormData({
                    ...formData,[getControlItem.name] : event.target.value
                })}
                />)
                break;
            case 'select':
                element =(
                    <Select onValueChange={(value)=>setFormData({
                        ...formData,[getControlItem.name] : value
                    })} value= {value}>
                        <SelectTrigger>
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options &&
                                getControlItem?.options.length >0 ?
                                getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;
            case 'textarea':
                element =( 
                    <Textarea
                    name ={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.id}
                    value = {value}
                    onChange={(event) => setFormData({
                        ...formData,[getControlItem.name] : event.target.value
                    })}
                    />
                );
                break;
            default:
                element =( <Input 
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id ={getControlItem.name}
                    type={getControlItem.type}
                    />);
                    break;
        }
        return element;
    }
  return (
    <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3'>
            {
                formControls.map(controlItem => <div className='grid w-full gap-1.5' key={controlItem.name}>
                    <Label className="mb-1">{controlItem.label}</Label>
                    {
                        renderInputsByComponentType(controlItem)
                    }
                </div>)
            }
        </div>
        <MotionButton type='submit' disabled={isButtonDisabled} whileHover={{scale:1.05}} className='mt-2 w-full'>{buttonText || 'Submit'}</MotionButton>
    </form>
  )
}

export default CommonForm