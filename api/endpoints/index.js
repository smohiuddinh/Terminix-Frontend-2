const API_ROUTE = {
  user: {
    login: "signIn",
    signUp: "signUp",
    sendOtp: "sendOtp",
    submitOtp: "submitOtp",
    checkapi: "checkapi",
    changePasword: "changePasword"
  },
  project: {
    getAllProject: "/project/getAllProject",
    getProjectByClient: "/project/getProjectByClient",
    addProject: "/project/addProject",
    getProjectById: "/project/getProjectById",
    submitProposals: "/project/submitProposals",
    getProjectPropsalByClient: '/project/getProjectPropsalByClient',
    editProject: '/project/editProject'
  
  },
  job: {
    getAllJob: "/job/getAllJob",
    getJobById: "/job/getJobById",
    getJobByIdFreelancer: "/job/getJobByIdFreelancer",
    addJob: "/job/addJob",
    getJobsByClient: '/job/getJobsByClient',
    editJob: '/job/editJob',
    applyjob: "/job/applyJob",
    getJobPropsalByClient: "/job/getJobPropsalByClient",
    closejob: "/job/closeJob",
    jobProposalAction:"/job/jobProposalAction",
    getJobShortListCandidate : "/job/getAllJobs/shortlist"
    
  },
  gigs: {
    getGigs: "/gigs/getGigs",
    getGigsById: "/gigs/getGigsById",
    addGigs: "/gigs/addGigs",
    getSingleGigs: "/gigs/getSingleGigs",
    getGigsByUserId: "/gigs/getGigsByUser",
    getGigsPackages: "/gigs/getPackages",
    editGigs: "/gigs/editGigs",
    getGigsFiles: '/gigs/getGigsFiles',
    editGigsFiles: '/gigs/editGigsFiles'
  },
  freelancer: {
    checkIsFreelancer: '/freelancer/checkIsFreelancer',
    getFreelancerProfile: '/freelancer/getFreelancerProfile',
    addProfile: '/freelancer/addProfile',
    editProfile: '/freelancer/editProfile',
    getFreelancerDashboardData: '/freelancer/getFreelancerDashboardData'
  },
  client: {
    getClientDashboardData: '/client/getClientDashboardData',
    clientEditProfile: '/client/clientEditProfile'
  },

  superadmin: {
    getAllOrders: '/superadmin/getAllOrder',
    getAllFreelancers: '/superadmin/getAllFreelancers',
    getAllGigs: '/superadmin/getAllGigs',
    getAllProjects: '/superadmin/getAllProjects',
    getAllUsers: '/superadmin/getAllUsers',
    statisticData: '/superadmin/statisticData',
    getAllJobs: '/superadmin/getAllJobs',
    closeDispute: '/superadmin/closeDispute'

  },
  dispute: {
    getAllDisputeByClient: '/dispute/getAllDisputeByClient',
    getAllDisputeByFreelancer: '/dispute/getAllDisputeByFreelancer',
    getDisputeById: '/dispute/getDisputeById',
    addDispute: '/dispute/addDispute',
    addResponseDispute: '/dispute/addResponseDispute',
    getAllDisputeById: '/dispute/getAllDisputeById',
    getAllDisputeByAdmin: '/dispute/getAllDisputeByAdmin',
    getDisputeAdminById : '/dispute/getDisputeAdminById'
  },
  order: {
    getAllOrderByFreelancer: '/order/getAllOrderByFreelancer',
    getSingleOrderByFreelancer: '/order/getSingleOrderByFreelancer',
    getAllOrderByClient: '/order/getAllOrderByClient',
    getSingleOrderByClient: '/order/getSingleOrderByClient',
    getAllOrderByAdmin: '/order/getAllOrderByAdmin',

  },

  messages: {
    addMessageByUser: '/messages/addMessageByUser',
    getAllMessageByUser: '/messages/getAllMessageByUser',
    getMessageByUserWithRecipitant: '/messages/getMessageByUserWithRecipitant',
  },
  notifications: {
    getNofication: '/notifications/getNotification',
    unread_count: '/notifications/unread-count',
    mark_read: '/notifications/mark-read'
  },
  rating: {
    addFreelancerRating: '/rating/addFreelancerRating',
    getFreelancerGigRatings: '/rating/getFreelancerGigRatings',
    useFreelancerAverageRating : '/rating/getFreelancerAverageRating'
  },
  feedback: {
    getAllFeedback: '/feedback/getAllFeedback',
    addFeedback: '/feedback/addFeedback'
  },
   issue: {
    getAllIssue: '/issue/getAllIssue',
    addIssue: '/issue/addIssue'
  },
   contact: {
    getAllContacts: '/contact/getAllContacts',
    addContacts: '/contact/addContacts'
  } 
};

export default API_ROUTE;
