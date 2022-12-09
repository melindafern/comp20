class state {
    constructor(state_name, state_abbrev, state_population) {

    this.state_name = state_name;
    this.state_abbrev = state_abbrev;
    }
}
    
const States = [
    new state("Massachusetts", "MA", 6893000),
];
    
    
    
    
exports.getstate = () => {
    return States;
};