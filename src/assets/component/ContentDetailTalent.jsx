import { alpha, Box, Button, Tab, Tabs, Typography, useTheme } from "@mui/material"
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import foto2 from '../img/foto2.svg';
import fotoCireng from '../img/cireng.jpeg';
import mail from '../img/mail.svg';
import thumbs from '../img/thumbs.svg';
import ButtonIcon from "./ButtonIcon";
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

import { getTalentDetail } from "../services/apis";
import { useInner } from "../context/InnerContentProvider";


const ContentDetailTalent = () => {

   const {innerContent, setInnerContent} = useInner()
   const [talent, setTalent] = React.useState({});
   const theme = useTheme()

   // fetch talent detail
   const fetchDataTalent = React.useCallback(
      async (talentId) => {
         try {
            const response = await getTalentDetail(talentId);
            setTimeout(() => {
               setTalent(response.data);
            }, 1);
            // console.log(response.data);
         } catch (error) {
            console.log("error heeey");
         }
      },
      []
   )


   React.useEffect(() => {

      if (innerContent != null) {
         fetchDataTalent(innerContent.talentId);
         // console.log("-----------------------> " + innerContent.talentId)
      }

   }, []);


   React.useEffect(() => {

      console.log(talent)


   }, [talent])






   const getDateSubstring = (value) => {
      return String(value).substring(0, 10)
   }




   const [value, setValue] = React.useState('profile');

   const handleChange = (event, newValue) => {
      setValue(newValue);
      // console.log(newValue)
   };



   const handleDownload = (talent) => {
      const url = talent.talentCvUrl;
      if (url) {
        window.open(url, '_blank');
      } 
    };

   return (
      <Box sx={{ width: '100%', height: '100%' }}>

         {/*  NAV */}
         <Box sx={{ width: '100%', padding: '20px 0 20px 0', fontSize: '1rem', fontWeight: '500', color: theme.palette.dark_1.main }}>
            <Button onClick={() => setInnerContent({ nav: 'talent', talentId: '' })} variant="text" startIcon={<KeyboardBackspaceRoundedIcon />} sx={{ color: theme.palette.primary.main }}>Kembali</Button>
         </Box>




         {/* CONTETNT */}
         <Box sx={{
            width: '100%',
            // padding: '0 0 20px 0',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '9px',
            boxShadow: '1px 14px 21px -15px rgba(0,0,0,0.30)'
         }}>




            {/* title */}
            <Box sx={{ padding: '10px 20px', borderBottom: `3px solid ${theme.palette.border_1.main}`, width: '100%' }}>Title</Box>


            {/* main content */}
            <Box sx={{ display: 'flex', position: 'relative', flexDirection: 'column' }}>



               {/* 1 */}
               <Box sx={{ padding: '20px 20px 0 20px', display: 'flex', width: '100%', flexDirection: 'column', borderRadius: '9px', boxShadow: '1px 14px 21px -15px rgba(0,0,0,0.30)' }}>

                  <Box sx={{ display: 'flex', borderBottom: `1px solid ${theme.palette.border_1.main}`, paddingBottom: '20px', gap: '20px' }}>

                     <Box
                        sx={{
                           display: 'flex',
                           minHeight:'100px',
                           minWidth: '100px',
                           width: '100px',  // Pastikan lebar kotak tetap konsisten
                           height: '100px', // Pastikan tinggi kotak tetap konsisten
                           borderRadius: '16px', // Sudut membulat
                           overflow: 'hidden', // Menyembunyikan bagian gambar yang keluar dari kotak
                           backgroundColor: '#f0f0f0', // Opsional: memberi warna latar belakang jika gambar tidak tersedia
                           alignItems: 'center', // Mengatur gambar di tengah
                           justifyContent: 'center', // Mengatur gambar di tengah
                        }}
                     >
                        <img
                           src={talent.talentPhotoUrl ? talent.talentPhotoUrl : foto2}
                           alt="Talent"
                           style={{
                              width: '100%',  // Mengatur lebar gambar sesuai dengan lebar kontainer
                              height: '100%', // Mengatur tinggi gambar sesuai dengan tinggi kontainer
                              objectFit: 'cover', // Menjaga rasio aspek gambar dan mengisi kontainer
                           }}
                        />
                     </Box>

                     <Box sx={{ boxShadow: '1 1 10px 10px #000' }}>

                        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                           <Typography sx={{ fontSize: '1.4rem', fontWeight: '600' }}>{talent.talentName}</Typography>

                           <Box sx={{
                              width: "fit-content",
                              borderRadius: "20px",
                              backgroundColor: talent.employeeStatus === 'Active' ? '#30A952' : '#CF1D1D',
                              color: 'white',
                              textAlign: 'center',
                              padding: '2px 8px',
                              fontSize: '.75rem',
                              display: 'flex',
                              alignItems: 'center',
                              height: 'fit-content'

                           }}>{talent.employeeStatus}</Box>

                           <Box sx={{
                              width: "fit-content",
                              borderRadius: "20px",
                              backgroundColor: talent.talentStatus === 'Onsite' ? '#586A84' : '#DBDBDB',
                              color: talent.talentStatus === 'Onsite' ? 'white' : '#586A84',
                              textAlign: 'center',
                              padding: '2px 8px',
                              fontSize: '.75rem',
                              height: 'fit-content',

                              display: 'flex',
                              alignItems: 'center'

                           }}>{talent.talentStatus}</Box>

                        </Box>

                        <Box sx={{ width: '50%', marginTop: '10px', color: theme.palette.dark_1.main }}>
                           {talent.talentDescription}
                        </Box>



                     </Box>
                  </Box>

                  <Box sx={{ width: '100%' }}>
                     <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"

                     >
                        <Tab value="profile" label="Profile" sx={{ textTransform: 'capitalize' }} />
                        <Tab value="statistic" label="Statistic" sx={{ textTransform: 'capitalize' }} />
                     </Tabs>
                  </Box>



               </Box>


               {/* 2 */}






               {
                  value == 'profile' ?

                     <>

                        <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: `3px solid ${theme.palette.border_1.main}` }}>
                           <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '10px' }}>

                              <Box>
                                 <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Nama Talent</Typography>
                                 <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{talent.talentName}</Typography>
                              </Box>

                              <Box>
                                 <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Jenis Kelamin</Typography>
                                 <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{talent.sex}</Typography>
                              </Box>

                           </Box>

                           <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '10px', }}>

                              <Box>
                                 <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Nomor Induk Pegawai</Typography>
                                 <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{talent.nip}</Typography>

                              </Box>

                              <Box>
                                 <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Tanggal Lahir</Typography>
                                 <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{getDateSubstring(talent.dob)}</Typography>

                              </Box>

                           </Box>
                        </Box>




                        <Box sx={{ padding: '20px', borderBottom: `3px solid ${theme.palette.border_1.main}` }}>

                           <Typography>CV</Typography>

                           <ButtonIcon state={talent.talentCvUrl}  text='Download SV' onClick={()=> handleDownload(talent)} icon={<ArticleRoundedIcon />} />

                           





                           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '10px' }}>

                                 <Box>
                                    <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Pengalaman</Typography>
                                    <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{talent.talentExperience}</Typography>
                                 </Box>

                                 <Box>
                                    <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Skill Set</Typography>

                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                       {talent.skillSet != null ? talent.skillSet.map(

                                          skill => <Box key={skill.skillsetId} sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.background.dark, backgroundColor: theme.palette.dark_2.main, borderRadius: '9px', padding: '2px 8px', border: `1px solid ${alpha(theme.palette.dark_1.main, '.3')}` }}>{skill.skillName}</Box>
                                       ) : null}

                                    </Box>

                                 </Box>

                              </Box>



                              <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '10px' }}>

                                 <Box>
                                    <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Level</Typography>
                                    <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{talent.talentLevel}</Typography>

                                 </Box>

                                 <Box>
                                    <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Posisi</Typography>

                                    <Box sx={{ display: 'flex', gap: '10px' }}>
                                       {talent.position != null ? talent.position.map(

                                          position => <Box key={position.positionId} sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.background.dark, backgroundColor: theme.palette.dark_2.main, borderRadius: '9px', padding: '2px 8px', border: `1px solid ${alpha(theme.palette.dark_1.main, '.3')}` }}>{position.positionName}</Box>
                                       ) : null}

                                    </Box>

                                 </Box>

                              </Box>
                           </Box>

                        </Box>






                        <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                           <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '10px' }}>

                              <Box>
                                 <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Email</Typography>
                                 <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{talent.email}</Typography>
                              </Box>

                              <Box>
                                 <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Biografi Video</Typography>
                                 <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{talent.videoUrl}</Typography>
                              </Box>

                           </Box>

                           <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '10px', }}>

                              <Box>
                                 <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>No. HP / Whatsapp</Typography>
                                 <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: theme.palette.background.dark }}>{talent.cellphone}</Typography>

                              </Box>



                           </Box>
                        </Box>

                     </>

                     :

                     <Box sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                        <Box sx={{ padding: '15px', borderRadius: '10px', display: 'flex', width: '50%', backgroundColor: theme.palette.dark_2.main, justifyContent: 'space-between' }}>

                           <Box>
                              <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Total Requested</Typography>
                              <Typography>{talent.totalRequested}</Typography>

                           </Box>

                           <Box>
                              <img src={mail} alt="" />
                           </Box>

                        </Box>

                        <Box sx={{ padding: '15px', borderRadius: '10px', display: 'flex', width: '50%', backgroundColor: theme.palette.dark_2.main, justifyContent: 'space-between' }}>

                           <Box>
                              <Typography sx={{ fontSize: '.8rem', fontWeight: '500', color: theme.palette.dark_1.main }}>Total Requested</Typography>
                              <Typography>{talent.totalRequested}</Typography>

                           </Box>

                           <Box>
                              <img src={thumbs} alt="" />
                           </Box>

                        </Box>
                     </Box>
               }











               <Button onClick={() => setInnerContent({ nav: 'edit_talent', talentId: talent.talentId })} variant="outlined" sx={{ position: 'absolute', top: '20px', right: '20px' }}>edit talent</Button>

            </Box>







         </Box>
      </Box>

   )
}

export default ContentDetailTalent