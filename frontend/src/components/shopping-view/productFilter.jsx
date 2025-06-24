import { filterOptions } from '@/config'
import { Label } from '../ui/label'
import React, { Fragment } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'
export default function ProductFilter({filters,handleFilter}) {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className='p-4 border-b'>
          <h2 className='text-lg font-semibold'>Filter </h2>
        </div>
        <div className='p-4 space-y-4'>
          {
            Object.keys(filterOptions).map(keyItem => 
            <>
              <div>
                <h3 className='text-base font-extrabold'>{keyItem }</h3>
                <div className='md:grid flex  gap-2 mt-2'>
                  {
                    filterOptions[keyItem].map(options => 
                    <Label className='flex items-center gap-2 font-normal'>
                      <Checkbox onCheckedChange={()=> handleFilter(keyItem,options.id)} checked={filters && Object.keys(filters).length>0 &&
                        filters[keyItem] && filters[keyItem].indexOf(options.id) > -1 
                      }/>
                      {
                        options.label
                      }
                    </Label>)
                  }
                </div>
              </div>
              <Separator/>

            </>)
          }
        </div>
    </div>
  )
}
