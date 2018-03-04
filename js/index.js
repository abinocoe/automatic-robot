var robotMapper = robotMapper || {}

robotMapper.setup = () => {
    this.$instructionsInput = $('#instructions-input');
    $('#instructions-form').on('submit', robotMapper.handleSubmit.bind(this))
}

robotMapper.handleSubmit = (e) => {
    e.preventDefault();
    let response = getResponse(this.$instructionsInput.val());
    $('#results').html(`<h1>${response}<h1>`)
}

$(() => robotMapper.setup())