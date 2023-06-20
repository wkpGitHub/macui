import './layout.less'
export default {
  props: {
    table: {},
    form: {}
  },
  setup (props) {
    return () => {
      const { table: Table, form: Form } = props
      return <div class={'table-form'}>
        <div class={'table-form__table'}>
          <Table/>
        </div>
        <div class={'table-form__form'}>
          <Form/>
        </div>
      </div>
    }
  }
}
