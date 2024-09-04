import instance from "./axiosConfig";

const baseUrl = import.meta.env.VITE_API_URL

//--> restricted
const apiGetTalents = import.meta.env.VITE_API_GETTALENTSELASTIC
const apiGetTalent = import.meta.env.VITE_API_GETTALENT

const apiGetApprovals = import.meta.env.VITE_API_GETAPPROVALS
const apiGetApprovalsElastic = import.meta.env.VITE_API_GETAPPROVALSELASTIC




//--> CREATE BASE URL WITH PARAM
const buildUrl = (base, params) => {
   let url = base + "?"
   for (const key in params) {
      if (params[key]) {
         url += `${key}=${params[key]}&`;
      }
   }
   // Remove the trailing '&'
   url = url.slice(0, -1);
   return url;
};





//--> GET TALENTS
export const getTalents = async (keyword, talentLevel, talentExperience, size, talentStatus, page, sort) => {

   const apiUrl = buildUrl(apiGetTalents, {
      keyword, talentLevel, talentExperience, size, talentStatus, page, sort

   });
   console.log(apiUrl)

   try {

      const response = await instance.get(apiUrl);

      return response;
   } catch (error) {
      // console.log("error getting talent", error);
      throw error;
   }
};



// --> POST TALENT
export const postTalent = async (talentData, photoFile, cvFile) => {
   try {
      const formData = new FormData();
      formData.append("request", new Blob([JSON.stringify(talentData)], { type: "application/json" }));

      if (photoFile) {
         formData.append("photoFile", photoFile);
      }

      if (cvFile) {
         formData.append("cvFile", cvFile);
      }

      const url = baseUrl + '/master-management/talent'

      // console.log("-----> " + url)
      const response = await instance.post(url, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      });

      return response.data;

   } catch (error) {
      // console.error("Error saving talent data:", error);
      throw error;
   }
};






//--> GET DETAIL TALENT
export const getTalentDetail = async (talentId) => {
   // console.log("url detail talent " + baseUrl + apiGetTalent+talentId )
   try {
      const response = await instance.get(baseUrl + apiGetTalent + "/" + talentId)

      // console.log("berhasil get data")
      return response

   } catch (error) {
      // console.log(error)
      throw error
   }
}



//--> GET APPROVALS
export const getApprovals = async (keyword, categoryFilter, pageApprove, sizeApprove, requestStatus, tglRequest, sort) => {

   const requestDate = tglRequest
   const talentRequestStatus = requestStatus
   const page = pageApprove
   const size = sizeApprove
   const searchBy = categoryFilter



   
   const apiUrl = buildUrl(apiGetApprovalsElastic, {
      keyword, searchBy, page, size, talentRequestStatus, requestDate, sort
   });


   console.log("approval URL -> " + apiUrl)

   try {

      const response = await instance.get(apiUrl);

      // console.log(response.data)

      return response;
   } catch (error) {
      // console.log("error getting talent", error);
      throw error;
   }
};


//--> PUT APROVAL  talentRequestId, action, rejectReason

export const putApproval = async (data) => {
   const apiUrl = `${baseUrl}${apiGetApprovals}`

   try {
      const response = await instance.put(apiUrl, data)
      return response;
   } catch (error) {
      console.error('Error:', error);
   }
};



//-> PUT TALENT
export const putTalent = async (talentData, photoFile, cvFile, talentID) => {
   try {
      const formData = new FormData();
      formData.append("request", new Blob([JSON.stringify(talentData)], { type: "application/json" }));

      if (photoFile) {
         formData.append("photoFile", photoFile);
      }

      if (cvFile) {
         formData.append("cvFile", cvFile);
      }

      const url = baseUrl + '/master-management/talent/' + talentID

      console.log("-----> " + url)
      const response = await instance.put(url, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      });

      return response.data;

   } catch (error) {
      console.error("Error saving talent data:", error);
      throw error;
   }
};