import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {options} from 'uione';
import {ApprRoleAssignmentClient} from './service/client/ApprRoleAssignmentClient';
import {ApprUserClient} from './service/client/ApprUserClient';
import {MasterDataClient} from './service/client/MasterDataClient';
import {RoleAssignmentClient} from './service/client/RoleAssignmentClient';
import {RoleClient} from './service/client/RoleClient';
import {UserClient} from './service/client/UserClient';
import {MasterDataService} from './service/MasterDataService';

const httpRequest = new HttpRequest(axios, options);
class ApplicationContext {
  readonly masterDataService: MasterDataService = new MasterDataClient();
  readonly roleAssignmentService = new RoleAssignmentClient(httpRequest);
  readonly apprRoleAssignmentService = new ApprRoleAssignmentClient(httpRequest);
  readonly roleService = new RoleClient(httpRequest);
  readonly userService = new UserClient(httpRequest);
  readonly apprUserService = new ApprUserClient(httpRequest);
}

export const context = new ApplicationContext();
