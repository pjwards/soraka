import {
  Component,
  Vue,
} from 'vue-property-decorator';
import MainComponent from '@/modules/nibble/components/main/main.component';
import { User } from '@/models/user';
import {
  logOut,
} from '@/api/user';

@Component({
  components: {
    MainComponent,
  },
})
export default class BaseComponent extends Vue {
  private drawer: boolean = false;
  private title: string = 'Nibble';
  private avatarTile: boolean = false;
  private avatarSize: number = 24;

  private get user(): User {
    return this.$store.state.user;
  }

  public logIn(): void {
    this.$router.push('login');
  }

  public logOut(): void {
    logOut().subscribe(() => this.$store.dispatch('logout'));
  }
}
