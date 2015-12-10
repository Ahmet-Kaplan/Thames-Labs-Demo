######################################################################
                            Search Filters
######################################################################

Files used:
  - search-box.js/html: Wrapper for the whole search row: general input, filters input and tag-like list
  - filter-box.js/html: Contain the input for the filters only
  - search-help.js/html: Modal to display the help text

Defining filters:
  The filter box template takes only two parameters which are the name of the collection on which the filters must be applied and the corresponding index.
  This parameter must be passed as a string. For instance, {{> filterBox collectionName='tasks' index=TasksIndex}} will apply filters on the tasks list.

  The filters themselves are stored in the collection file as an object alongside the collection definintion, index, etc. as:
    Collections.nameOfYourCollection.filters = { filter1, filter2, ... }

  The filter object itself is built as follow.

  ======================
      Filter object
  ======================

    nameOfTheFilter: {                                          Name of the property on which the filter will work. Note that this must be the name of the prop in the easy search index

      display: 'MyField:',                  String              Text that will be used in the dropdown as well as for the search (case insensitive) and will also be used to display the filter tag

      prop: 'nameOfTheFilter',              String              The name of the prop in the easy search index. A corresponding rule must be defined in options.search.props.prop
                                                                MUST be identical to the key to allow displaying in tags (dirty hack)

      collectionName: 'myCollection',       String (Optional)   The collection from which the dropdown list will be generated and looked for. 
                             [required with 'collectionName']   The code will look for Collections[collectionName].index so an index must be defined as well it that collection

      autosuggestFilter: {prop1: 'value'},  Object (Optional)   The props that must be applied to the filter's collection before the autosuggest is rendered.
                                                                For instance in the case of tags the filter could be {collection: 'tasks'} to restrict the autosuggest to only the tasks tags.

      valueField: '__originalId',           String (Optional)   Name of the field returned by the search index that should be used as the value on the select <option value="valueField">nameField</option>
                             [required with 'collectionName']

      nameField: 'name',                    String (Optional)   Name of the field returned by the search index that should be used as the display on the select <option value="valueField">nameField</option>
                             [required with 'collectionName']   This field value will also be passed to the options.search.props.prop

      subscriptionById: 'fieldById',        String (Optional)   Name of the subscription that must be used to fetch the object to display on the filter tag
                             [required with 'collectionName']

      displayValue: function(user) {        Function (Optional) Used to return the correct formatting of the field for the filter tag. If not set, the id will be used.
        if(user) {                                              Takes one argument which is the unique object returned by the subscription. This function has been defined to cope with the varying display
          return user.profile.name;                             of the different collections (e.g. users will return user.profile.name, contact might return contact.forename + contact.lastname)
        }
      },
      verify: function(value) {             Function (Optional) For filters that do not take a collection as input, you can use this function to check the validity of the input
        if(value.isValid()) {                                   before the prop is defined. The function must return true if the input is valid, false otherwise.
          return true;                                          In the latter case, the prop will not be set.
        } else {                                                For example, if the input must be a date, we can check that the date is valid before actually setting it.
          return false;
        }
      },
      defaultOptions: ['op1', 'op2']        Array (Optional)    For filters that do not take a collection as input, an array of the fixed options that will be displayed in the dropdown.
    }


  Filters can be divided in two categories whether they use another collection to generate their options.
  
  **Using another collection:
    Those are used when you want to filter by Company, Contact, Opportunity, etc. In this case, you want to set up the collectionName, the valueField (likely to be '__originalId'),
    the nameField, the subscriptionById and the displayValue.

  **Static filters:
    Those will be used when the dropdown list is not dynamic. This is for example the case with dates, values, etc. In this case you might want to set up the verify function and maybe the defaultOptions. 

  ======================
  Index prop definition
  ======================
  With each filter, a search prop must be defined with the same name (hence the reason for having the name of the field identical to the prop parameter).
  Note that between each filter, an 'AND' statement is applied while an 'OR' statement is applied inside a filter. Since the search prop cannot be passed as an object,
  it is returned as a comma separated list. The list is then obtained by using the split(',') method.
  
  Here is what your rule should look like for a multiple input filter:
  if(options.search.props.nameOfTheFilter) {
    selector.fieldToFilterBy = {$in: options.search.props.nameOfTheFilter.split(',')};
  }

  For a filter with a unique value, you should have something like:
  if(options.search.props.nameOfTheFilter) {
    selector.fieldToFilterBy = {$eq: options.search.props.nameOfTheFilter};
  }

  ======================
    Search help Modal
  ======================
  Each entity uses different filters which are defined locally. To help the user now which filters are available and how they work, a search modal has been created.
  When adding a filter or setting the filter on a new entity, you can insert the corresponding help description in the search-help.js.
  For a new filter, add an object in the corresponding switch case with {name: String, description: String, multiple: Boolean}. The multiple flag indicate whether
  the filter accepts multiple entries or not (for instance, a 'Before Date' is unique while a 'Company' filter can accept multiple entries).
  For a new entity, add a case to the switch with the name of the entity's collection as trigger.

  ======================
        Conclusion
  ======================
  If you want a live example of how the filters are defined, see the task-collection.js file.