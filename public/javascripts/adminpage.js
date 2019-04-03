function makeTable(container, data) {
    container.html('');
    var table = $("<table/>").addClass('table');
    $.each(data, function(rowIndex, r) {
        var row = $("<tr/>");
        $.each(r, function(colIndex, c) {
            row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").html(c));
        });
        table.append(row);
    });
    return container.append(table);
}

function user_post(url, options, callback) {
    $.post({
        url: url,
        data: options,
        success: function(result) {
            callback(result);
        }
    });
}

function change_user_role(user, pri) {
    user_post('/users/change_priority', {
        username: user,
        priority: pri
    }, function(result) {get_userlist(function(result) {
        var userlist_table = [
            ['Username', 'Role', 'Action']
        ];
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            userlist_table.push([item.username, role(item.priority), generate_action(item.username)]);
        }
        makeTable($('#userlist_table'), userlist_table)
    });});
}

function generate_action(username) {
    var template = '<div class="dropdown">';
    template += '<button class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>';
    template += '<div class="dropdown-menu" role="menu">{0}</div>';
    template += '</div>';

    function generate_menuitem(href, name) {
        return '<a class="dropdown-item" href="{0}">{1}</a>'.format(href, name);
    }
    var menuItems = generate_menuitem('javascript:change_user_role(\'{0}\', {1})'.format(username, 0), 'Set as administrator');
    menuItems += generate_menuitem('javascript:change_user_role(\'{0}\', {1})'.format(username, 1), 'Set as advisor');
    menuItems += generate_menuitem('javascript:change_user_role(\'{0}\', {1})'.format(username, 2), 'Set as customer');
    menuItems += generate_menuitem('javascript:change_user_role(\'{0}\', {1})'.format(username, -1), 'Remove');
    return template.format(menuItems);
}

function role(priority) {
    if (priority == 0) return "administrator";
    if (priority == 1) return "advisor";
    return "customer";
}
$(window).on('load', function() {
    get_userlist(function(result) {
        var userlist_table = [
            ['Username', 'Role', 'Action']
        ];
        for (var i = 0; i < result.length; i++) {
            var item = result[i];
            userlist_table.push([item.username, role(item.priority), generate_action(item.username)]);
        }
        makeTable($('#userlist_table'), userlist_table)
    });
})