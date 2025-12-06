const API_ROUTE = {
  user: {
    login: "/auth/signIn",
    signUp: "/auth/signUp",
    sendOtp: "/auth/sendOtp",
    submitOtp: "/auth/submitOtp",
    checkapi: "/auth/checkapi",
    changePasword: "/auth/changePasword"
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
    getAllContacts: '/api/contact/getAllContact',
    getAllIntOrg: '/api/contact/getAllInterOrg',
    addContacts: '/api/contact/addContacts'
  } 
};

export default API_ROUTE;
