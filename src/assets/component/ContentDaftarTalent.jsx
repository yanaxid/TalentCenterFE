
import { Box, useTheme } from "@mui/material";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useInner } from "../context/InnerContentProvider";
import { getTalents } from "../services/apis";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ButtonIcon from "./ButtonIcon";
import SelectCustom from "./SelectCutom";
import SearchField from "./SearchField";
import CustomizedTables from "./Tabel";
import debounce from "lodash.debounce";



const sty_1 = {
   width: '100%',
   padding: '20px 0',
   display: 'flex',
   justifyContent: 'space-between',
   gap: '8px',
   alignItems: 'center',
   justifyContent: 'center'
}

const sty_2 = {
   width: '100%',
   display: 'flex',
   gap: '8px',
   alignItems: 'center'
}

const sty_3 = ({ theme }) => ({
   height: 'fit-content',
   width: '100%',
   backgroundColor: theme.palette.background.paper,
   border: `1px solid ${theme.palette.border_1.main}`,
   borderRadius: '10px',
   boxShadow: '1px 14px 5px -15px rgba(0,0,0,0.50)'
})


const ContentDaftarTalent = () => {

   console.log('-> DAFTAR TALENT')

   const { innerContent, setInnerContent } = useInner()
   const theme = useTheme()

   // --> talent
   const [talents, setTalents] = useState([])
   const [keyword, setKeyword] = useState('')
   const [talentLevel, setTalentLevel] = useState('')
   const [talentExperience, setExperience] = useState('')
   const [talentStatus, setTalentStatus] = useState('')
   const [size, setSize] = useState(10)
   const [page, setPage] = useState(1)
   const [sort, setSort] = useState('')

   // fetch talent
   const fetchDataTalents = useCallback(
      async (keyword, talentLevel, talentExperience, size, talentStatus, page, sort) => {
         try {
            const response = await getTalents(keyword, talentLevel, talentExperience, size, talentStatus, page, sort);
            setTimeout(() => {
               setTalents(response.data);
            }, 1);
         } catch (error) {
            console.log("error heeey");
         }
      },
      []
   )

   // fx talent
   React.useEffect(() => {
      fetchDataTalents(keyword, talentLevel, talentExperience, size, talentStatus, page, sort)
   }, [keyword, talentLevel, talentExperience, size, talentStatus, page, sort])

   // handles talent
   const handleKeywordChange = useCallback((event) => {
      setKeyword(event.target.value);
      setPage(1);
   }, []);

   const debouncedResults = useMemo(() => {
      return debounce(handleKeywordChange, 300);
   }, []);

   useEffect(() => {
      return () => {
         debouncedResults.cancel();
      };
   });

   const handleTalentLevel = useCallback((event) => {
      setTalentLevel(event.target.value);
      setPage(1);
   }, []);

   const handleExperience = useCallback((event) => {
      setExperience(event.target.value);
      setPage(1);
   }, []);

   const handleTalentStatus = useCallback((event) => {
      setTalentStatus(event.target.value);
      setPage(1);
   }, []);

   const handleSort = useCallback((event) => {
      setSort(event.target.value);
      setPage(1);
   }, []);

   const [empStatus, setEmpStatus] = React.useState('');
   const handleEmpStatus = event => { setEmpStatus(event.target.value) };


   // Filter options
   const filterOptions = [
      { value: "", label: "None" },
      { value: "Junior", label: "Junior" },
      { value: "Middle", label: "Middle" },
      { value: "Senior", label: "Senior" },
   ];

   const filterPengalaman = [
      { value: "", label: "None" },
      { value: "0", label: "0-1 Tahun" },
      { value: "1", label: "2-4 Tahun" },
      { value: "2", label: "5+ Tahun" }
   ];

   const filterStatus = [
      { value: "", label: "None" },
      { value: "Onsite", label: "Onsite" },
      { value: "Not Onsite", label: "Not Onsite" }
   ];

   const filterKepegawaian = [
      { value: "", label: "None" },
      { value: "Active", label: "Active" },
      { value: "Non Active", label: "Non Active" }
   ];



   const [sortOptions, setsortOptions] = React.useState([])


   React.useEffect(() => {

      if (talentLevel != '' && talentStatus == '') {
         setsortOptions([
            { value: "", label: "None" },
            { value: "experience,asc", label: "Pengalaman A-Z" },
            { value: "experience,desc", label: "Pengalaman Z-A" },
            { value: "talent_status_name.keyword,asc", label: "Status A-Z" },
            { value: "talent_status_name.keyword,desc", label: "Status Z-A" },
            { value: "employee_status_name.keyword,asc", label: "Kepegawaian A-Z" },
            { value: "employee_status_name.keyword,desc", label: "Kepegawaian Z-A" },
         ])
      } else if (talentLevel == '' && talentStatus != '') {
         setsortOptions([
            { value: "", label: "None" },
            { value: "talent_level_name.keyword,asc", label: "Level A-Z" },
            { value: "talent_level_name.keyword,desc", label: "Level Z-A" },
            { value: "experience,asc", label: "Pengalaman A-Z" },
            { value: "experience,desc", label: "Pengalaman Z-A" },
            { value: "employee_status_name.keyword,asc", label: "Kepegawaian A-Z" },
            { value: "employee_status_name.keyword,desc", label: "Kepegawaian Z-A" },
         ])

      } else if (talentLevel != '' && talentStatus != '') {
         setsortOptions([
            { value: "", label: "None" },
            { value: "experience,asc", label: "Pengalaman A-Z" },
            { value: "experience,desc", label: "Pengalaman Z-A" },
            { value: "employee_status_name.keyword,asc", label: "Kepegawaian A-Z" },
            { value: "employee_status_name.keyword,desc", label: "Kepegawaian Z-A" },
         ])

      } else {
         setsortOptions([
            { value: "", label: "None" },
            { value: "talent_level_name.keyword,asc", label: "Level A-Z" },
            { value: "talent_level_name.keyword,desc", label: "Level Z-A" },
            { value: "experience,asc", label: "Pengalaman A-Z" },
            { value: "experience,desc", label: "Pengalaman Z-A" },
            { value: "talent_status_name.keyword,asc", label: "Status A-Z" },
            { value: "talent_status_name.keyword,desc", label: "Status Z-A" },
            { value: "employee_status_name.keyword,asc", label: "Kepegawaian A-Z" },
            { value: "employee_status_name.keyword,desc", label: "Kepegawaian Z-A" },
         ])
      }
   }, [talentLevel, talentStatus])


   return (

      <>
         <Box sx={{ width: '100%', padding: '20px', fontSize: '1.2rem', fontWeight: '500', color: theme.palette.dark_1.main }}>
            Daftar Talent
         </Box>

         <Box sx={sty_1}>
            <Box sx={sty_2}>

               <SearchField action={debouncedResults} placeholder='Cari nama talent' />
               {[
                  { id: "filter-level", label: "Level", options: filterOptions, age: talentLevel, handleChange: handleTalentLevel },
                  { id: "filter-pengalaman", label: "Pengalaman", options: filterPengalaman, age: talentExperience, handleChange: handleExperience },
                  { id: "filter-status", label: "Status", options: filterStatus, age: talentStatus, handleChange: handleTalentStatus },
                  { id: "filter-kepegawaian", label: "Kepegawaian", options: filterKepegawaian, age: empStatus, handleChange: handleEmpStatus },
                  { id: "filter-urutkan", label: "Urutkan", options: sortOptions, age: sort, handleChange: handleSort }
               ].map((filter, index) => (
                  <SelectCustom key={index} index={index} filter={filter} />
               ))}
            </Box>
            <ButtonIcon state='false' onClick={() => setInnerContent({ nav: 'add_talent', talentId: null })} icon={<AddRoundedIcon />} text={'Add Talent'} />

         </Box>
         <Box sx={sty_3({ theme })}>
            <Box sx={{ width: '100%' }}>
               <CustomizedTables
                  talents={talents}
                  size={size}
                  setSize={setSize}
                  page={page}
                  setPage={setPage}
               />
            </Box>
         </Box>

      </>
   )
}

export default memo(ContentDaftarTalent)


