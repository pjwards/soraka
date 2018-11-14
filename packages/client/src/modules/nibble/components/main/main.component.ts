import * as fb from '../../../../api/facebook/index';
import {
  login,
  logout,
  signUp,
} from '../../../../api/user/index';
import {
  StatusResponse,
  UserResponse,
} from '@/facebook.interfaces';
import { User } from '@/models/user';
import {
  Component,
  Prop,
  Vue,
} from 'vue-property-decorator';

@Component
export default class MainComponent extends Vue {
  @Prop() private msg!: string;

  public created() {
    // this.$http
    //   .get('/api')
    //   .then(response => response.data)
    //   .then((data) => {
    //     this.msg = data.message;
    //   });
  }

  public getLoginStatus(): void {
    fb.getLoginStatus().subscribe((response: StatusResponse) => console.log(response));
  }

  public login(): void {
    login().subscribe((user: User) => this.$store.dispatch('login', user));
  }

  public logout(): void {
    logout().subscribe((result: boolean) => this.$store.dispatch('logout'));
  }

  public signUp(): void {
    signUp().subscribe((user: User) => this.$store.dispatch('login', user));
  }

  public getUser(): void {
    fb.getUser().subscribe((response: UserResponse) => console.log(response));
  }
}
