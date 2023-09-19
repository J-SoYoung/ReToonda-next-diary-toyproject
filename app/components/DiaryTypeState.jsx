'use client'
import React, {useState} from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import AppsIcon from '@mui/icons-material/Apps';


export default function DiaryTypeState() {
  const [typeState, setTypeState] = useState('grid')

  return (
    <div>
      <ViewHeadlineIcon/>
      <AppsIcon/>
    </div>
  )
}
