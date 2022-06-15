import { Component, OnInit } from '@angular/core';

/**
 * RxJs
 */
import { Observable } from 'rxjs'

/**
 * Interface
 */
import { User } from './../../interface/user'
import { GetUsersResponse } from  './../../interface/getusers.response'

/**
 * Service
 */
import { UserService } from  './../../service/user.service'
import { Role } from 'src/app/interface/role';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent
  implements OnInit {
  public users?: User[]
  response: any


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const getUsers$: Observable<GetUsersResponse> = this.userService.getUsers(0)
    getUsers$.subscribe(getUsersResponse => {
      this.response = getUsersResponse
      this.users = getUsersResponse.content
    })
  }

  changePage(p: number) {
    this.userService.getUsers(p).subscribe(getUserResponse =>{
      this.response = getUserResponse
      this.users = getUserResponse.content
    })
  }

  counter (p:number) {
    return new Array(p)
  }

}
