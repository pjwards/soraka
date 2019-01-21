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
}
