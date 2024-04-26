using { com.vale.jobApplication } from '../db/data-model';

@path : '/service/jobApplication'
service jobApplicationSrv
{
    entity JobRequisitionIntegrity as
        projection on jobApplication.JobRequisitionIntegrity;

    entity PublicRelative as
        projection on jobApplication.PublicRelative;
}

