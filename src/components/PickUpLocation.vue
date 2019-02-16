<template>
    <b-container class="pick-up-location">
        <b-row>
            <b-col class="pick-up-location__content">
                <div class="pick-up-location__content--title">
                    <h2>
                        Let's find your ideal car
                    </h2>
                </div>
                <div class="pick-up-location__content--input">
                    <label for="pick-up-location-input">Pick-up Location</label>
                    <vue-bootstrap-typeahead
                            :data="locations"
                            id="pick-up-location-input"
                            v-model="search"
                            :serializer="s => s.name"
                            @hit="selectedLocation = $event"
                            :minMatchingChars="numOfChars"
                            placeholder="city, airport, station, region, district…"
                    >
                        <template slot="suggestion" slot-scope="{ data, htmlText }">
                            <div class="d-flex align-items-center main-results">
                                <span v-html="htmlText"></span>, {{ data.region }},&nbsp;{{ data.country }}
                            </div>
                        </template>
                    </vue-bootstrap-typeahead>

                    <div data-v-9a21a6f4="" class="list-group shadow vbt-autcomplete-list no-results" style="width: 500px;" v-if="isEmpty">
                        <a tabindex="0" href="#" class="vbst-item list-group-item list-group-item-action ">
                            <div data-v-ae38c7be="" class="d-flex align-items-center">
                                No results found
                            </div>
                        </a>
                    </div>

                    <div data-v-9a21a6f4="" class="list-group shadow vbt-autcomplete-list unmatched" style="width: 500px;" v-if="haveUnmatchedResults">
                        <a tabindex="0" href="#" class="vbst-item list-group-item list-group-item-action" v-for="location in locations" :key="location.locationId">
                            <div data-v-ae38c7be="" class="d-flex align-items-center">
                                {{ location.name }},&nbsp;{{ location.region }},&nbsp;{{ location.country }}
                            </div>
                        </a>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
    import _ from 'lodash';

    export default {
        name: "PickUpLocation",
        data () {
            return {
                search: '',
                locations: [],
                selectedLocation: null,
                isEmpty: false,
                haveUnmatchedResults: false,
                numOfChars: 2
            }
        },
        methods: {
            async getLocations(searchText) {
                await this.$store.dispatch('getResults', { searchTerm: searchText })
                    .then((response) =>
                    {
                        this.isEmpty = false;
                        this.haveUnmatchedResults = false;

                        this.locations = response;

                        if(!this.locations[0].hasOwnProperty('country') && this.search.length >= 2)
                        {
                            this.isEmpty = true;
                        }

                        this.haveUnmatchedResults = this.locations[0].hasOwnProperty('country') && this.search.length >= 2 && document.getElementsByClassName("main-results").length === 0;
                    });
            }
        },
        watch: {
            search: _.debounce(function(searchText) { this.getLocations(searchText) }, 250)
        },
        components: {
            VueBootstrapTypeahead
        }
    }
</script>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css?family=Ubuntu');

    .pick-up-location
    {
        background: #F3CE56;
        border-radius: 0;
        box-shadow: none;
        border-bottom: 2px solid #DAB129;

        &__content
        {
            padding: 20px;

            &--title
            {
                h2
                {
                    font-size: 2em;
                    font-weight: 700;
                    line-height: 1.3em;
                    text-shadow: none;
                    padding-bottom: 10px;
                    font-family: "Ubuntu", Helvetica, Arial, sans-serif !important;
                    font-style: normal;
                }
            }

            &--input
            {
                label
                {
                    color: #444;
                    font-size: 0.875em;
                }
            }
        }
    }
</style>