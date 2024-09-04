
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
// import { context } from "../layout/Root";
import React, { useEffect, useMemo, useState } from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ButtonIcon from "./ButtonIcon";
import SelectCustom from "./SelectCutom";
import SearchField from "./SearchField";
import CustomizedTables from "./Tabel";


import TableApprovals from "./TabelAprovals";

import DatePickerCustom from "./DatePickerCustom";
import { useInner } from "../context/InnerContentProvider";
import { getApprovals } from "../services/apis";
import debounce from "lodash.debounce";





const ContentDaftarPersetujuanTalent = () => {



   const theme = useTheme();
   const { innerContent, setInnerContent } = useInner()



   // --> approval
   const [keyword, setKeyword] = React.useState('');
   const [pageApprove, setPageApprove] = React.useState(1);
   const [sizeApprove, setSizeApprove] = React.useState(10);
   const [requestStatus, setRequestStatus] = React.useState('');
   const [tglRequest, setTglRequest] = React.useState('');
   const [categoryFilter, setCategoryFilter] = React.useState('agency_name');
   const [approvals, setApprovals] = React.useState([]);
   const [sort, setSort] = useState('');





   // fetch approval
   const fetchApprovals = React.useCallback(
      async (keyword, categoryFilter, pageApprove, sizeApprove, requestStatus, tglRequest, sort) => {
         try {
            const response = await getApprovals(keyword, categoryFilter, pageApprove, sizeApprove, requestStatus, tglRequest, sort);
            setTimeout(() => {
               setApprovals(response.data);
            }, 1);


            console.log(response.data)
         } catch (error) {
            console.log("error heeey");
         }
      },
      []
   );


   // fx approval
   React.useEffect(() => {
      // console.log(tglRequest)
      fetchApprovals(keyword, categoryFilter, pageApprove, sizeApprove, requestStatus, tglRequest, sort);

   }, [keyword, pageApprove, sizeApprove, requestStatus, tglRequest, sort]);



   // handle approval
   const handleCategoryFilter = React.useCallback((event) => {
      setCategoryFilter(event.target.value);
      setPageApprove(1);
   }, []);

   const handleRequestStatus = React.useCallback((event) => {
      setRequestStatus(event.target.value);
      setPageApprove(1);
   }, []);



   const handleTglRequest = React.useCallback((event) => {
      const { value } = event.target;

      if (value) {
         const [year, month, day] = value.split('-');
         const tanggal = `${month}/${day}/${year}`;

         console.log(tanggal);
         setTglRequest(tanggal);
      } else {
         setTglRequest('');
      }
      setPageApprove(1);
   }, []);



   const handleKeywordChange = React.useCallback((event) => {
      setKeyword(event.target.value);
      setPageApprove(1);
   }, []);


   const debouncedResults = useMemo(() => {
      return debounce(handleKeywordChange, 1000);
   }, []);

   useEffect(() => {
      return () => {
         debouncedResults.cancel();
      };
   });





   const handleSort = event => { setSort(event.target.value) };

   // Filter options
   const filterOptions = [
      { value: "agency_name", label: "Instansi" },
      { value: "talent_name", label: "Nama Talent" },
   ];

   // const defaultValue = "agency_name.keyword";


   const filterStatus = [
      { value: "", label: "None" },
      { value: "On Progress", label: "On Progress" },
      { value: "Approved", label: "Approved" },
      { value: "Rejected", label: "Rejected" }
   ];


   const [sortOptions, setsortOptions] = React.useState([])


   React.useEffect(() => {

      if (requestStatus != '' && tglRequest == '') {
         setsortOptions([
            { value: "", label: "None" },
            { value: "agency_name.keyword,asc", label: "Instansi A-Z" },
            { value: "agency_name.keyword,desc", label: "Instansi Z-A" },
            { value: "request_date,asc", label: "Tanggal Request A-Z" },
            { value: "request_date,desc", label: "Tanggal Request Z-A" },
            { value: "talent_name.keyword,asc", label: "Talent A-Z" },
            { value: "talent_name.keyword,desc", label: "Talent Z-A" }
         ])
      } else if (requestStatus == '' && tglRequest != '') {
         setsortOptions([
            { value: "", label: "None" },
            { value: "agency_name.keyword,asc", label: "Instansi A-Z" },
            { value: "agency_name.keyword,desc", label: "Instansi Z-A" },
            { value: "talent_name.keyword,asc", label: "Talent A-Z" },
            { value: "talent_name.keyword,desc", label: "Talent Z-A" },
            { value: "talent_request_status_name.keyword,asc", label: "Status A-Z" },
            { value: "talent_request_status_name.keyword,desc", label: "Status Z-A" },
         ])
      } else if (tglRequest != '' && requestStatus != '') {
         setsortOptions([
            { value: "", label: "None" },
            { value: "agency_name.keyword,asc", label: "Instansi A-Z" },
            { value: "agency_name.keyword,desc", label: "Instansi Z-A" },
            { value: "talent_name.keyword,asc", label: "Talent A-Z" },
            { value: "talent_name.keyword,desc", label: "Talent Z-A" },
         ])

      } else {
         setsortOptions([
            { value: "", label: "None" },
            { value: "agency_name.keyword,asc", label: "Instansi A-Z" },
            { value: "agency_name.keyword,desc", label: "Instansi Z-A" },
            { value: "request_date,asc", label: "Tanggal Request A-Z" },
            { value: "request_date,desc", label: "Tanggal Request Z-A" },
            { value: "talent_name.keyword,asc", label: "Talent A-Z" },
            { value: "talent_name.keyword,desc", label: "Talent Z-A" },
            { value: "talent_request_status_name.keyword,asc", label: "Status A-Z" },
            { value: "talent_request_status_name.keyword,desc", label: "Status Z-A" },
         ])
      }

      console.log(requestStatus + " -------- " + tglRequest)


   }, [requestStatus, tglRequest])




   return (

      <>
         <Box sx={{ width: '100%', padding: '20px', fontSize: '1.2rem', fontWeight: '500', color: theme.palette.dark_1.main }}>
            Daftar Persetujuan Talent
         </Box>

         <Box sx={{
            width: '100%',
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
            alignItems: 'center',
            justifyContent: 'center'
         }}>
            <Box sx={{
               width: '100%',
               display: 'flex',
               gap: '8px',
               alignItems: 'center'
            }}>

               <SearchField action={debouncedResults} placeholder={categoryFilter == '' ? "Cari" : categoryFilter == 'talent_name' ? "Cari Nama Talent" : categoryFilter == 'agency_name' ? "Cari Instansi" : null} />



               <SelectCustom
                  index={0}
                  filter={{
                     id: "filter-cari",
                     label: "Filter Cari",
                     options: filterOptions,
                     age: categoryFilter,
                     handleChange: handleCategoryFilter
                  }}
               />

               <DatePickerCustom value={tglRequest} onChange={handleTglRequest} />



               <SelectCustom
                  index={0}
                  filter={{
                     id: "filter-status",
                     label: "Filter Status",
                     options: filterStatus,
                     age: requestStatus,
                     handleChange: handleRequestStatus
                  }}
               />


               <SelectCustom
                  index={0}
                  filter={{
                     id: "filter-sort",
                     label: "Urutkan",
                     options: sortOptions,
                     age: sort,
                     handleChange: handleSort
                  }}
               />


            </Box>





         </Box>
         <Box sx={{
            height: 'fit-content',
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.border_1.main}`,
            borderRadius: '10px',
            boxShadow: '1px 14px 21px -15px rgba(0,0,0,0.50)'
         }}>
            <Box sx={{ width: '100%' }}>
               <TableApprovals

                  approvals={approvals}
                  sizeApprove={sizeApprove}
                  setSizeApprove={setSizeApprove}
                  pageApprove={pageApprove}
                  setPageApprove={setPageApprove}

               />
            </Box>



         </Box>

      </>
   )
}

export default ContentDaftarPersetujuanTalent




