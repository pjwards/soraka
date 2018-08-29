import {
  Component,
  Vue,
} from 'vue-property-decorator';
import MainComponent from '@/modules/nibble/components/main/main.component';
import { User } from '@/models/user';
import {
  login,
  logout,
  signUp,
} from '../../api/user';

@Component({
  components: {
    MainComponent,
  },
})
export default class Base extends Vue {
  private clipped: boolean = false;
  private drawer: boolean = false;
  private fixed: boolean = false;
  private items: any = [{
    icon: 'bubble_chart',
    title: 'Sign in',
  }, {
    icon: 'bubble_chart',
    title: 'Sign up',
  }];
  private miniVariant: boolean = false;
  private right: boolean = false;
  private rightDrawer: boolean = false;
  private title: string = 'Vuetify.js';
  private avatarTile: boolean = false;
  private avatarSize: number = 24;

  private get user(): User {
    return this.$store.state.user;
  }

  public login(): void {
    login().subscribe((user: User) => this.$store.dispatch('login', user));
  }

  public logout(): void {
    logout().subscribe(() => this.$store.dispatch('logout'));
  }

  public signUp(): void {
    signUp().subscribe((user: User) => this.$store.dispatch('login', user));
  }
}
