import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { Box, Button, Grid, useTheme } from "@mui/material";

import ButtonIconSquare from './ButtonIconSquare';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ModalApprove from './ModalApprove';
import { putApproval } from '../services/apis';
import toast from 'react-hot-toast';
import ModalReject from './ModalReject';






const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.dark_1.main,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:hover': {
      backgroundColor: theme.palette.action.hover,
   }
}));



export default function TableApprovals({ approvals, sizeApprove, setSizeApprove, pageApprove, setPageApprove }) {


   const convertDate = (time) => {
      const timestamp = time;
      const date = new Date(timestamp);

      console.log(date)
      const fullDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

      return fullDate
   }


   // const { approvals, sizeApprove, setSizeApprove, pageApprove, setPageApprove } = React.useContext(context)
   const [approv, setApprove] = React.useState(approvals.content || []);




   React.useEffect(() => {
      setApprove(approvals.content || []);

      console.log(approvals != null ? approvals : null)
   }, [approvals]);


   const theme = useTheme()

   const [pageSize, setPageSize] = React.useState(sizeApprove);


   const handleClickEntries = (size) => {
      setPageSize(size)
      setSizeApprove(size);
      setPageApprove(1);
   };

   const handlePageChange = (event, value) => {
      console.log("----------> " + value)
      setPageApprove(value);
   };


   





   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);


   const [open2, setOpen2] = React.useState(false);
   const handleOpen2 = () => setOpen2(true);
   const handleClose2 = () => setOpen2(false);









   const [dataApproval, setDataApproval] = React.useState({});


   // PUT --> APPROVAL
   const putApprovals = React.useCallback(
      async (data) => {
         try {
            const response = await putApproval(data);
            console.log(response);
            handleClose();
            toast.success(`Berhasil Approve`);

            // Update the approval status locally
            setApprove(prevApprovals =>
               prevApprovals.map(talent =>
                  talent.talentRequestId === data.talentRequestId
                     ? { ...talent, approvalStatus: 'Approved' }
                     : talent
               )
            );

         } catch (error) {
            toast.error(`Gagal Approve`);
            console.log("error heeey");
         }
      },
      []
   );



   const putApprovalsReject = React.useCallback(
      async (data) => {
         try {
            const response = await putApproval(data);
            console.log(response);
            handleClose2();
            toast.success(`Berhasil Reject`);

            // Update the approval status locally
            setApprove(prevApprovals =>
               prevApprovals.map(talent =>
                  talent.talentRequestId === data.talentRequestId
                     ? { ...talent, approvalStatus: 'Rejected' }
                     : talent
               )
            );

         } catch (error) {
            toast.error(`Gagal Reject`);
            console.log("error heeey");
         }
      },
      []
   );

   const handleApproval = (dataApproval) => {
      return (
         putApprovals(dataApproval)
      )
   }

   const handleApprovalReject = (dataApproval) => {
      return (
         putApprovalsReject(dataApproval)
      )
   }





   return (

      <>



         <ModalReject handleClose={handleClose2} open={open2} action={() => handleApprovalReject(dataApproval)} />
         <ModalApprove handleClose={handleClose} open={open} action={() => handleApproval(dataApproval)} />



         <TableContainer component={Paper} sx={{ margin: "none", boxShadow: 'none', borderRadius: '10px' }}>
            <Table sx={{ minWidth: 800 }} aria-label="customized table">
               <TableHead sx={{ fontSize: '.9rem' }}>
                  <TableRow >
                     <StyledTableCell sx={{ padding: '2px 20px', fontSize: '.75rem' }}>Instansi</StyledTableCell>
                     <StyledTableCell align="center" sx={{ padding: '2px 20px', fontSize: '.75rem', textAlign: 'left' }}>Tanggal Request</StyledTableCell>
                     <StyledTableCell align="center" sx={{ padding: '2px 20px', fontSize: '.75rem', textAlign: 'left' }}>Talent yang dipilih</StyledTableCell>
                     <StyledTableCell align="center" sx={{ padding: '2px 20px', fontSize: '.75rem' }}>Status</StyledTableCell>
                     <StyledTableCell align="right" sx={{ padding: '2px 20px', fontSize: '.75rem', textAlign: 'right' }}>Action</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>



                  {approv && approv.length > 0 ? approv.map(talent => (



                     <StyledTableRow key={talent.talentRequestId}>
                        <StyledTableCell component="th" scope="row" sx={{ padding: '5px 20px', }}>
                           {talent.agencyName}
                        </StyledTableCell>

                        <StyledTableCell align="center" sx={{ padding: '5px 20px', textAlign: 'left' }}>
                           {talent.requestDate.substring(0, 10)} 
                        </StyledTableCell>



                        <StyledTableCell align="center" sx={{ padding: '5px 20px', textAlign: 'left' }} >
                           {talent.talentName}
                        </StyledTableCell>



                        <StyledTableCell align="center" sx={{
                           padding: '0px',
                           padding: '5px 10px'
                        }}>

                           <Box sx={{ display: 'flex', justifyContent: 'center' }}>


                              <Box sx={{
                                 width: "fit-content",
                                 borderRadius: "20px",
                                 backgroundColor: talent.approvalStatus === 'On Progress' ? '#586A84' : talent.approvalStatus === 'Approved' ? theme.palette.success.main : talent.approvalStatus === 'Rejected' ? theme.palette.error.main : null,
                                 color: talent.approvalStatus === 'On Progress' ? 'white' : 'white',
                                 textAlign: 'center',
                                 padding: '2px 6px',
                                 fontSize: '.75rem',

                              }}>{talent.approvalStatus}</Box>
                           </Box>




                        </StyledTableCell>

                        <StyledTableCell align="right" sx={{ padding: '12px 20px' }}>

                           <Box sx={{ display: 'flex', justifyContent: 'end', gap: '10px', width: '100%' }}>

                              <ButtonIconSquare
                                 onClick={() => {
                                    handleOpen();
                                    setDataApproval({
                                       talentRequestId: talent.talentRequestId,
                                       action: 'Approved',
                                       rejectReason: ""
                                    });
                                 }}
                                 disable={talent.approvalStatus === 'On Progress' ? false : true}
                                 icon={<DoneIcon />}
                                 type='green'
                              />
                              <ButtonIconSquare

                                 onClick={() => {
                                    handleOpen2();
                                    setDataApproval({
                                       talentRequestId: talent.talentRequestId,
                                       action: 'Rejected',
                                       rejectReason: ""
                                    });
                                 }}
                                 disable={talent.approvalStatus === 'On Progress' ? false : true}
                                 icon={<CloseIcon />}
                                 type='red'
                              />
                           </Box>



                        </StyledTableCell>
                     </StyledTableRow>
                  )) :

                     <StyledTableRow>
                        <StyledTableCell colSpan={6} align="center">No talents found</StyledTableCell>
                     </StyledTableRow>



                  }
               </TableBody>
            </Table>



            <Box sx={{ padding: '8px' }}>
               <Grid container spacing={2}>
                  <Grid item xs={6}>
                     <Box display="flex" alignItems="center" gap={1}>
                        <Typography sx={{ color: theme.palette.dark_1.main, fontWeight: 400, fontSize: '.9rem' }}>
                           Entries
                        </Typography>
                        {[10, 20, 50].map(size => (
                           <Button
                              variant={pageSize === size ? 'contained' : 'text'}
                              key={size}
                              aria-label={`entries-${size}`}
                              size="small"
                              onClick={() => handleClickEntries(size)}
                              sx={{
                                 color: theme.palette.dark_1.main,
                                 minWidth: 'fit-content',
                                 padding: '0',
                                 borderRadius: "8px",
                                 boxShadow: 'none',
                                 backgroundColor: pageSize === size ? theme.palette.primary.main : null,
                              }}
                           >
                              <Box
                                 sx={{

                                    fontSize: ".8rem",
                                    height: '26px',
                                    width: '26px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: pageSize === size ? theme.palette.text.white : null,

                                 }}
                              >
                                 {size}
                              </Box>
                           </Button>
                        ))}
                     </Box>
                  </Grid>
                  <Grid item xs={6}>
                     <Box display="flex" justifyContent="flex-end">
                        <Pagination
                           count={approvals.totalPages}
                           page={pageApprove}
                           onChange={handlePageChange}
                           sx={{
                              "& .MuiPaginationItem-root": {

                                 fontWeight: '500',
                                 width: '26px',
                                 height: '26px',
                                 padding: '0',
                                 minWidth: '0px',
                                 borderRadius: '8px',

                                 color: theme.palette.dark_1.main,


                                 "&.Mui-selected": {
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.text.white,
                                 },
                                 "&:hover": {

                                 },
                                 "&:focus": {

                                 },
                              },
                           }}
                        />
                     </Box>
                  </Grid>
               </Grid>
            </Box>
         </TableContainer >

      </>



   )




}























