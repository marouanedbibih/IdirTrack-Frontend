export const vehicleDetailstemplate = {
    vehicle: {
      id: 0,
      matricule: "",
      type: "",
    },
    client: {
      id: 0,
      clientMicroserviceId: 0,
      name: "",
      company: "",
    },
    boitiersList: [
      {
        id: 0,
        device: {
          id: 0,
          deviceMicroserviceId: 0,
          imei: "",
          type: "",
        },
        sim: {
          id: 0,
          simMicroserviceId: 0,
          phoneNumber: "",
          ccid: "",
          type: "",
        },
        subscription: {
          id: 0,
          subscriptionMicroserviceId: 0,
          startDate: "",
          endDate: "",
        },
        subscriptionList: [
          {
            id: 0,
            subscriptionMicroserviceId: 0,
            startDate: "",
            endDate: "",
          },
        ],
      },
    ],
  }